package com.alternateappicon

import android.app.Activity
import android.app.Application
import android.content.ComponentName
import android.content.pm.PackageManager
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.util.Log
import com.margelo.nitro.NitroModules
import com.margelo.nitro.core.Promise
import com.margelo.nitro.alternateappicon.HybridAlternateAppIconSpec
import java.util.Collections

class HybridAlternateAppIcon : HybridAlternateAppIconSpec() {
  override fun getActiveIcon(): Promise<String> {
    return Promise.async {
      val context =
        NitroModules.applicationContext
          ?: throw Error("ACTIVITY_NOT_FOUND: React Native context is not available.")

      resolveActiveIconName(context.packageName, context.packageManager)
    }
  }

  override fun getAllAlternativeIcons(): Promise<Array<String>> {
    return Promise.async {
      val context =
        NitroModules.applicationContext
          ?: throw Error("React Native context is not available.")

      val packageName = context.packageName
      val packageManager = context.packageManager
      val packageInfo =
        packageManager.getPackageInfo(
          packageName,
          PackageManager.GET_ACTIVITIES or
            PackageManager.GET_META_DATA or
            PackageManager.GET_DISABLED_COMPONENTS,
        )

      val aliasList = ArrayList<String>()

      packageInfo.activities?.forEach { activityInfo ->
        if (activityInfo.targetActivity != null) {
          aliasList.add(
            activityInfo.name.replace("$packageName$MAIN_ACTIVITY_BASE_NAME", ""),
          )
        }
      }

      aliasList.toTypedArray()
    }
  }

  override fun setIcon(iconName: String): Promise<String> {
    return Promise.async {
      AppIconChangerEngine.setIcon(iconName)
    }
  }

  override fun resetIcon(): Promise<String> {
    return Promise.async {
      AppIconChangerEngine.setIcon("Default")
    }
  }

  private object AppIconChangerEngine : Application.ActivityLifecycleCallbacks {
    private const val MAIN_ACTIVITY_BASE_NAME = ".MainActivity"
    private const val TAG = "AlternateAppIcon"
    private const val DEFERRED_ICON_CHANGE_MS = 400L

    private val BLOCKED_ACTIVITY_SUBSTRINGS =
      listOf(
        "com.google.android.gms.auth",
        "com.google.android.gms.common.api.GoogleApiActivity",
        "SignInHubActivity",
        "com.facebook",
        "net.openid.appauth",
        "androidx.credentials",
        "com.android.chrome",
        "PlayCoreDialogWrapperActivity",
      )

    private val mainHandler = Handler(Looper.getMainLooper())
    private var deferredCompleteRunnable: Runnable? = null
    private val classesToKill: MutableSet<String> =
      Collections.synchronizedSet(mutableSetOf())
    private val startedActivityClasses: MutableSet<String> =
      Collections.synchronizedSet(mutableSetOf())

    @Volatile var componentClass: String = ""

    @Volatile private var pendingNewClass: String? = null

    @Volatile private var isCallbackRegistered: Boolean = false

    @Volatile private var isChangingIcon: Boolean = false

    @Volatile private var registeredApplication: Application? = null

    @Synchronized
    fun setIcon(iconName: String): String {
      val context =
        NitroModules.applicationContext
          ?: throw Error(
            "ACTIVITY_NOT_FOUND: The activity is null. Check if the app is running properly.",
          )

      val activity =
        context.currentActivity
          ?: throw Error(
            "ACTIVITY_NOT_FOUND: The activity is null. Check if the app is running properly.",
          )

      if (iconName.isEmpty()) {
        throw Error("EMPTY_ICON_STRING: Icon name is missing i.e. setIcon('YOUR_ICON_NAME_HERE')")
      }

      val packageName = context.packageName

      if (componentClass.isEmpty()) {
        componentClass = activity.componentName.className
        Log.d(TAG, "Initial component class set to: $componentClass")
      }

      val activeClass = "$packageName$MAIN_ACTIVITY_BASE_NAME$iconName"
      val currentIconName = getCurrentIconName(activity)

      if (iconName == currentIconName && pendingNewClass == null) {
        Log.d(TAG, "Icon already active: $iconName")
        return "Icon is already set to $iconName"
      }

      if (pendingNewClass == activeClass) {
        Log.d(TAG, "Icon change already pending: $iconName")
        return "Icon is already changing to $iconName"
      }

      pendingNewClass?.let { oldPending ->
        if (oldPending != activeClass && oldPending != componentClass) {
          classesToKill.add(oldPending)
          Log.d(TAG, "Added old pending class to kill list: $oldPending")
        }
      }

      pendingNewClass = activeClass

      if (componentClass.isNotEmpty() && componentClass != activeClass) {
        classesToKill.add(componentClass)
        Log.d(TAG, "Added current class to kill list: $componentClass")
      }

      if (!isCallbackRegistered) {
        try {
          unregisterCallbackIfNeeded()
          activity.application.registerActivityLifecycleCallbacks(this)
          registeredApplication = activity.application
          isCallbackRegistered = true
          Log.d(TAG, "Lifecycle callbacks registered")
        } catch (e: Exception) {
          Log.e(TAG, "Failed to register lifecycle callbacks", e)
          throw Error("CALLBACK_REGISTRATION_FAILED: Failed to register lifecycle callbacks")
        }
      }

      Log.d(TAG, "Icon change scheduled: $iconName")
      return "Your icon will change to $iconName"
    }

    private fun getCurrentIconName(activity: Activity): String {
      return iconNameFromComponentClass(activity.componentName.className, activity.packageName)
    }

    @Synchronized
    private fun unregisterCallbackIfNeeded() {
      if (isCallbackRegistered && registeredApplication != null) {
        try {
          registeredApplication?.unregisterActivityLifecycleCallbacks(this)
          isCallbackRegistered = false
          registeredApplication = null
          Log.d(TAG, "Lifecycle callbacks unregistered successfully")
        } catch (e: Exception) {
          Log.e(TAG, "Failed to unregister lifecycle callbacks", e)
        }
      }
    }

    private fun hasPendingIconChange(): Boolean =
      pendingNewClass != null || classesToKill.isNotEmpty()

    private fun isBlockedActivityClass(className: String): Boolean =
      BLOCKED_ACTIVITY_SUBSTRINGS.any { blocked ->
        className.contains(blocked, ignoreCase = true)
      }

    private fun isAppMainActivityClass(className: String): Boolean =
      className.contains(MAIN_ACTIVITY_BASE_NAME)

    private fun cancelDeferredIconChange() {
      deferredCompleteRunnable?.let { mainHandler.removeCallbacks(it) }
      deferredCompleteRunnable = null
    }

    private fun canCompleteIconChangeNow(): Boolean {
      if (!hasPendingIconChange()) {
        return false
      }

      synchronized(startedActivityClasses) {
        for (className in startedActivityClasses) {
          if (isBlockedActivityClass(className)) {
            Log.d(
              TAG,
              "Deferring icon change: blocked activity still in foreground stack: $className",
            )
            return false
          }
        }
      }

      val current = NitroModules.applicationContext?.currentActivity
      if (current != null) {
        val currentClass = current.componentName.className
        if (isBlockedActivityClass(currentClass)) {
          Log.d(TAG, "Deferring icon change: current activity is blocked: $currentClass")
          return false
        }
        if (!isAppMainActivityClass(currentClass)) {
          Log.d(
            TAG,
            "Deferring icon change: current activity is not MainActivity: $currentClass",
          )
          return false
        }
      }

      return true
    }

    private fun scheduleDeferredIconChange(reason: String) {
      if (!hasPendingIconChange()) {
        return
      }

      cancelDeferredIconChange()
      deferredCompleteRunnable =
        Runnable {
          deferredCompleteRunnable = null
          if (canCompleteIconChangeNow()) {
            Log.d(TAG, "Running deferred icon change ($reason)")
            completeIconChange()
          } else {
            Log.d(TAG, "Deferred icon change skipped ($reason); waiting for a safer moment")
          }
        }
      mainHandler.postDelayed(deferredCompleteRunnable!!, DEFERRED_ICON_CHANGE_MS)
    }

    @Synchronized
    private fun completeIconChange() {
      if (isChangingIcon) {
        Log.d(TAG, "Icon change already in progress, skipping")
        return
      }

      if (!hasPendingIconChange()) {
        Log.d(TAG, "No pending icon changes, cleaning up callbacks")
        unregisterCallbackIfNeeded()
        return
      }

      if (!canCompleteIconChangeNow()) {
        Log.d(TAG, "Icon change not safe yet; keeping pending state")
        return
      }

      isChangingIcon = true

      try {
        val activity =
          NitroModules.applicationContext?.currentActivity
            ?: run {
              Log.w(TAG, "Activity is null, cannot complete icon change")
              return
            }

        val packageManager = activity.packageManager
        val packageName = activity.packageName

        pendingNewClass?.let { newClass ->
          try {
            packageManager.setComponentEnabledSetting(
              ComponentName(packageName, newClass),
              PackageManager.COMPONENT_ENABLED_STATE_ENABLED,
              PackageManager.DONT_KILL_APP,
            )
            componentClass = newClass
            Log.d(TAG, "Icon enabled successfully: $newClass")
          } catch (e: Exception) {
            Log.e(TAG, "Failed to enable component: $newClass", e)
          }
          pendingNewClass = null
        }

        synchronized(classesToKill) {
          for (className in classesToKill) {
            try {
              packageManager.setComponentEnabledSetting(
                ComponentName(packageName, className),
                PackageManager.COMPONENT_ENABLED_STATE_DISABLED,
                PackageManager.DONT_KILL_APP,
              )
              Log.d(TAG, "Icon disabled successfully: $className")
            } catch (e: Exception) {
              Log.e(TAG, "Failed to disable component: $className", e)
            }
          }
          classesToKill.clear()
        }

        Log.d(TAG, "Icon change completed successfully")
      } finally {
        isChangingIcon = false
        unregisterCallbackIfNeeded()
      }
    }

    override fun onActivityPaused(activity: Activity) {}

    override fun onActivityCreated(activity: Activity, savedInstanceState: Bundle?) {}

    override fun onActivityStarted(activity: Activity) {
      startedActivityClasses.add(activity.componentName.className)
      cancelDeferredIconChange()
    }

    override fun onActivityResumed(activity: Activity) {}

    override fun onActivityStopped(activity: Activity) {
      startedActivityClasses.remove(activity.componentName.className)
      val className = activity.componentName.className
      Log.d(TAG, "Activity stopped: $className")
      if (isBlockedActivityClass(className)) {
        Log.d(TAG, "Skipped scheduling icon change for blocked activity stop: $className")
        return
      }
      scheduleDeferredIconChange("onActivityStopped:$className")
    }

    override fun onActivitySaveInstanceState(activity: Activity, outState: Bundle) {}

    override fun onActivityDestroyed(activity: Activity) {
      startedActivityClasses.remove(activity.componentName.className)
      val className = activity.componentName.className
      Log.d(TAG, "Activity destroyed: $className")
      if (isBlockedActivityClass(className)) {
        return
      }
      scheduleDeferredIconChange("onActivityDestroyed:$className")
    }
  }

  companion object {
    private const val MAIN_ACTIVITY_BASE_NAME = ".MainActivity"

    private fun resolveActiveIconName(
      packageName: String,
      packageManager: PackageManager,
    ): String {
      val packageInfo =
        packageManager.getPackageInfo(
          packageName,
          PackageManager.GET_ACTIVITIES or PackageManager.GET_DISABLED_COMPONENTS,
        )

      var mainActivityEnabled = false

      packageInfo.activities?.forEach { activityInfo ->
        val componentName = ComponentName(packageName, activityInfo.name)
        if (!isComponentEnabled(packageManager, componentName, activityInfo.enabled)) {
          return@forEach
        }

        if (activityInfo.targetActivity != null) {
          return iconNameFromComponentClass(activityInfo.name, packageName)
        }

        if (activityInfo.name.endsWith(MAIN_ACTIVITY_BASE_NAME)) {
          mainActivityEnabled = true
        }
      }

      if (mainActivityEnabled) {
        return "Default"
      }

      val cachedClass = AppIconChangerEngine.componentClass
      if (cachedClass.isNotEmpty()) {
        return iconNameFromComponentClass(cachedClass, packageName)
      }

      throw Error("ACTIVE_ICON_NOT_FOUND: Could not determine the active app icon.")
    }

    private fun isComponentEnabled(
      packageManager: PackageManager,
      componentName: ComponentName,
      manifestEnabled: Boolean,
    ): Boolean {
      return when (packageManager.getComponentEnabledSetting(componentName)) {
        PackageManager.COMPONENT_ENABLED_STATE_ENABLED -> true
        PackageManager.COMPONENT_ENABLED_STATE_DISABLED -> false
        else -> manifestEnabled
      }
    }

    private fun iconNameFromComponentClass(className: String, packageName: String): String {
      if (className.endsWith(MAIN_ACTIVITY_BASE_NAME)) {
        return "Default"
      }

      val prefix = "$packageName$MAIN_ACTIVITY_BASE_NAME"
      if (className.startsWith(prefix)) {
        return className.removePrefix(prefix).ifEmpty { "Default" }
      }

      val activityNameSplit = className.split("MainActivity").toTypedArray()
      return if (activityNameSplit.size == 2) {
        activityNameSplit[1].ifEmpty { "Default" }
      } else {
        "Default"
      }
    }
  }
}
