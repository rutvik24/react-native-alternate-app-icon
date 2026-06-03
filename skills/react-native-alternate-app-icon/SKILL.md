---
name: react-native-alternate-app-icon
description: >-
  Integrates react-native-alternate-app-icon (Nitro runtime app icon changer)
  in React Native apps. Use when adding alternate app icons, dynamic launcher
  icons, setIcon, getActiveIcon, iOS CFBundleAlternateIcons, Android
  activity-alias, or Nitro Modules 0.32 setup.
---

# React Native Alternate App Icon

## Agent skill (install first for coding agents)

```bash
npx skills add rutvik24/react-native-alternate-app-icon -g -y
```

Docs: https://rutvik24.github.io/react-native-alternate-app-icon/docs/agents/skill

## Package install

```bash
bun add react-native-alternate-app-icon react-native-nitro-modules@0.32.0
bundle exec pod install --project-directory="ios"
```

Requires RN ≥ 0.76. Pin **`react-native-nitro-modules@0.32.0`** (peer dependency).

## Rules

| Topic | Rule |
| ----- | ---- |
| API | `setIcon`, `getActiveIcon`, `getAllAlternativeIcons`, `resetIcon` from `react-native-alternate-app-icon` |
| Primary icon | Pass `"Default"` to `setIcon` or use `resetIcon()` |
| iOS name | Must match `CFBundleAlternateIcons` key / `.appiconset` folder name |
| Android name | Suffix after `MainActivity` in `activity-alias` (e.g. `.MainActivityAlternativeIcon` → `"AlternativeIcon"`) |
| Android timing | Icon applies when app is **backgrounded** — not instant like iOS |
| iOS alert | System confirmation dialog is expected Apple behavior |
| Simulator | Recent iOS simulators may not show the alert — **test on device** |
| After native changes | Rebuild app — Metro reload alone is insufficient |
| Android release / R8 | Library ships `consumer-rules.pro`; see [ProGuard docs](https://rutvik24.github.io/react-native-alternate-app-icon/docs/android/proguard) |

## Quick usage

```ts
import { setIcon, getActiveIcon, resetIcon } from 'react-native-alternate-app-icon'

await setIcon('AlternativeIcon')
const active = await getActiveIcon()
await resetIcon() // or setIcon('Default')
```

## Platform quick pick

- **iOS** → asset catalog + `Info.plist` `CFBundleIcons` → [reference.md#ios](reference.md#ios)
- **Android** → mipmaps + `activity-alias` in `AndroidManifest.xml` → [reference.md#android](reference.md#android)

## Troubleshooting

| Symptom | Likely fix |
| ------- | ---------- |
| iOS icon does not change | Wrong `CFBundleAlternateIcons` key; test on physical device |
| Android icon unchanged while app open | Background the app — switch is deferred by design |
| `setIcon` throws / rejects | Name mismatch vs native config |
| Nitro / hybrid not found | Rebuild after install; run `pod install` on iOS |

## More detail

- [reference.md](reference.md) — API, iOS/Android setup
- [examples.md](examples.md) — copy-paste snippets
- Docs: https://rutvik24.github.io/react-native-alternate-app-icon/
