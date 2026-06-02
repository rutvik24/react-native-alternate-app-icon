# Agent instructions — react-native-alternate-app-icon

## Install the skill

```bash
npx skills add rutvik24/react-native-alternate-app-icon -g -y
```

Per-provider (`-a cursor`, `-a claude-code`, `-a github-copilot`, …):  
https://rutvik24.github.io/react-native-alternate-app-icon/docs/agents/skill

Skill path: `skills/react-native-alternate-app-icon/` (`SKILL.md`, `reference.md`, `examples.md`).

## Package

- **npm:** `react-native-alternate-app-icon`
- **Peer:** `react-native-nitro-modules@0.32.0` (required; pin this version)
- **API:** `setIcon`, `getActiveIcon`, `getAllAlternativeIcons`, `resetIcon`
- **RN:** ≥ 0.76 · **Platforms:** iOS, Android

## When editing this repo

| Path | Purpose |
| ---- | ------- |
| `src/` | TypeScript API and Nitro specs |
| `android/`, `ios/` | Native Kotlin / Swift |
| `skills/react-native-alternate-app-icon/` | Agent skill — keep in sync with API and setup docs |
| `docs/` | Docusaurus site |

Update the skill when changing public API or platform setup requirements.

## Commands

```bash
bun install
bun run build
cd docs && bun run build
```

## Docs

https://rutvik24.github.io/react-native-alternate-app-icon/
