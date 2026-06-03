# Reference — react-native-alternate-app-icon

## Package

- **npm:** `react-native-alternate-app-icon`
- **peer:** `react-native-nitro-modules@0.32.0` (pin this version)
- **platforms:** iOS 10.3+, Android (activity-alias)
- **RN:** ≥ 0.76

Full docs: https://rutvik24.github.io/react-native-alternate-app-icon/

## API

| Method | Returns | Description |
| ------ | ------- | ----------- |
| `setIcon(iconName)` | `Promise<string>` | Switch icon; `"Default"` for primary |
| `getActiveIcon()` | `Promise<string>` | Current icon name |
| `getAllAlternativeIcons()` | `Promise<string[]>` | All configured names |
| `resetIcon()` | `Promise<string>` | Same as `setIcon('Default')` |
| `AlternateAppIcon` | hybrid object | Low-level Nitro hybrid |

## iOS {#ios}

1. Add `.appiconset` folders under `Images.xcassets` (folder name = `setIcon()` argument).
2. Register in `Info.plist` under `CFBundleIcons` → `CFBundleAlternateIcons`.
3. User sees a system alert when the icon changes (required by Apple).

Docs: https://rutvik24.github.io/react-native-alternate-app-icon/docs/ios/setup

## Android {#android}

1. Add mipmaps (`ic_launcher_*`) for each alternate icon.
2. Add `activity-alias` entries targeting `MainActivity`; only one alias enabled at a time.
3. Icon name = part after `MainActivity` in alias class (e.g. `MainActivityAlternativeIcon` → `AlternativeIcon`).
4. Library disables other aliases and enables the target; change visible after backgrounding.
5. **Release / R8:** Consumer ProGuard rules ship in the AAR; no manual keeps for this library. Do not add redundant Activity keeps for aliases.

Docs: https://rutvik24.github.io/react-native-alternate-app-icon/docs/android/setup · [ProGuard](https://rutvik24.github.io/react-native-alternate-app-icon/docs/android/proguard)

## Naming cheat sheet

| Platform | Config | Example `setIcon()` |
| -------- | ------ | ------------------- |
| iOS | `CFBundleAlternateIcons` key | `AlternativeIcon` |
| Android | `activity-alias` suffix | `AlternativeIcon` |
| Both | Primary | `Default` |
