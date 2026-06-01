import Foundation
import NitroModules
import UIKit

class HybridAlternateAppIcon: HybridAlternateAppIconSpec {
  func getActiveIcon() throws -> Promise<String> {
    let promise = Promise<String>()
    DispatchQueue.main.async {
      if !UIApplication.shared.supportsAlternateIcons {
        promise.reject(withError: RuntimeError.error(withMessage: "iOS: Alternate icons are not supported on this device."))
        return
      }

      let currentIcon = UIApplication.shared.alternateIconName
      promise.resolve(withResult: currentIcon ?? "Default")
    }
    return promise
  }

  func getAllAlternativeIcons() throws -> Promise<[String]> {
    let promise = Promise<[String]>()
    DispatchQueue.main.async {
      if !UIApplication.shared.supportsAlternateIcons {
        promise.reject(withError: RuntimeError.error(withMessage: "iOS: Alternate icons are not supported on this device."))
        return
      }

      guard let infoPlist = Bundle.main.infoDictionary,
            let icons = infoPlist["CFBundleIcons"] as? [String: Any],
            let alternateIcons = icons["CFBundleAlternateIcons"] as? [String: Any] else {
        promise.resolve(withResult: ["Default"])
        return
      }

      var iconList = ["Default"]
      for iconName in alternateIcons.keys {
        iconList.append(iconName)
      }
      promise.resolve(withResult: iconList)
    }
    return promise
  }

  func setIcon(iconName: String) throws -> Promise<String> {
    let promise = Promise<String>()
    DispatchQueue.main.async {
      if !UIApplication.shared.supportsAlternateIcons {
        promise.reject(withError: RuntimeError.error(withMessage: "iOS: Alternate icons are not supported on this device."))
        return
      }

      if iconName.isEmpty {
        promise.reject(withError: RuntimeError.error(withMessage: "Invalid iconName: iconName cannot be empty."))
        return
      }

      let currentIcon = UIApplication.shared.alternateIconName
      if iconName == (currentIcon ?? "Default") {
        promise.reject(withError: RuntimeError.error(withMessage: "iOS: The specified icon is already in use."))
        return
      }

      let newIconName = (iconName == "Default") ? nil : iconName

      UIApplication.shared.setAlternateIconName(newIconName) { error in
        if let error = error {
          promise.reject(withError: error)
        } else {
          promise.resolve(withResult: "Icon changed to \(iconName)")
        }
      }
    }
    return promise
  }

  func resetIcon() throws -> Promise<String> {
    let promise = Promise<String>()
    DispatchQueue.main.async {
      if !UIApplication.shared.supportsAlternateIcons {
        promise.reject(withError: RuntimeError.error(withMessage: "iOS: Alternate icons are not supported on this device."))
        return
      }

      UIApplication.shared.setAlternateIconName(nil) { error in
        if let error = error {
          promise.reject(withError: error)
        } else {
          promise.resolve(withResult: "Icon reset to default.")
        }
      }
    }
    return promise
  }
}
