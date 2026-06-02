# Examples — react-native-alternate-app-icon

## List and switch icons

```ts
import {
  getAllAlternativeIcons,
  getActiveIcon,
  setIcon,
} from 'react-native-alternate-app-icon'

const icons = await getAllAlternativeIcons()
// => ["Default", "AlternativeIcon", ...]

const current = await getActiveIcon()
if (current !== 'Holiday') {
  await setIcon('Holiday')
}
```

## Reset to default

```ts
import { resetIcon, setIcon } from 'react-native-alternate-app-icon'

await resetIcon()
// equivalent:
await setIcon('Default')
```

## Settings screen pattern

```ts
async function onPickIcon(name: string) {
  try {
    const message = await setIcon(name)
    console.log(message)
  } catch (e) {
    console.error('Icon switch failed', e)
  }
}
```

## Android UX note

Tell users the new launcher icon appears after they leave the app (home button / app switcher). iOS updates immediately (with system alert).
