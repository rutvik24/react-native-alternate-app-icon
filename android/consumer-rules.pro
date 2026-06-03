# react-native-alternate-app-icon
# Nitro HybridObjects are registered from C++ via JNI; R8 cannot trace those edges.

-keep class com.alternateappicon.** { *; }
-keep class com.margelo.nitro.alternateappicon.** { *; }

# HybridObject subclasses are instantiated via reflection; do not shrink or obfuscate.
-keep class * extends com.margelo.nitro.core.HybridObject { *; }
-keep class * implements com.margelo.nitro.HybridObject { *; }

-dontwarn com.margelo.nitro.**
