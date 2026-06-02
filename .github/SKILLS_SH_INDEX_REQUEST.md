# Request indexing on skills.sh

Copy this into a **new GitHub issue** on [vercel-labs/skills](https://github.com/vercel-labs/skills/issues/new) after `skills/` is on the `main` branch of the public repo.

**Title:** `Listing: Request indexing for rutvik24/react-native-alternate-app-icon`

---

## Request indexing for rutvik24/react-native-alternate-app-icon

Requesting indexing so the skill appears on the leaderboard, is discoverable via `npx skills find ...`, and shows at the canonical URL:

https://skills.sh/rutvik24/react-native-alternate-app-icon/react-native-alternate-app-icon

**Repository:** https://github.com/rutvik24/react-native-alternate-app-icon  
**License:** MIT

### Skills included (1)

| Skill | Description |
| --- | --- |
| `react-native-alternate-app-icon` | Integrates react-native-alternate-app-icon (Nitro runtime app icon changer) in React Native apps — iOS CFBundleAlternateIcons, Android activity-alias, setIcon API, Nitro Modules 0.32. |

### Install

```bash
npx skills add rutvik24/react-native-alternate-app-icon -g -y
```

Per agent:

```bash
npx skills add rutvik24/react-native-alternate-app-icon \
  --skill react-native-alternate-app-icon \
  -a cursor -g -y
```

### Checklist

- [x] Public GitHub repository
- [x] MIT license
- [x] Open Agent Skills format — `skills/react-native-alternate-app-icon/SKILL.md` with `name` + `description` frontmatter
- [x] `skills.sh.json` at repo root for directory grouping
- [x] Installable via `npx skills add rutvik24/react-native-alternate-app-icon --list` (verify after merge to `main`)

**Docs:** https://rutvik24.github.io/react-native-alternate-app-icon/docs/agents/skill
