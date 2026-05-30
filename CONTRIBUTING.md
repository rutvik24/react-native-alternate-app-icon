# Contributing to react-native-alternate-app-icon

Thank you for your interest in contributing! This guide covers how to set up the project, submit changes, and what we expect from pull requests.

Please read our [Code of Conduct](./CODE_OF_CONDUCT.md) before participating. By contributing, you agree to uphold it.

## Table of contents

- [Ways to contribute](#ways-to-contribute)
- [Development setup](#development-setup)
- [Project layout](#project-layout)
- [Making changes](#making-changes)
- [Running the example app](#running-the-example-app)
- [Code style](#code-style)
- [Commit messages](#commit-messages)
- [Pull requests](#pull-requests)
- [Reporting bugs](#reporting-bugs)
- [Releases](#releases)

## Ways to contribute

- **Bug reports** — reproducible steps, platform (iOS/Android), and React Native version
- **Feature requests** — open an issue first for larger changes so we can align on design
- **Documentation** — README fixes and the Docusaurus site under `docs/` ([live docs](https://rutviknabhoya.github.io/react-native-alternate-app-icon/))
- **Code** — fixes, native implementations, TypeScript API, or example app improvements

For substantial features or breaking API changes, please [open an issue](https://github.com/rutviknabhoya/react-native-alternate-app-icon/issues) before starting work.

## Development setup

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | 18+ (example app recommends 22.11+) |
| [Bun](https://bun.sh) | Latest (used for installs and scripts) |
| React Native environment | Xcode (iOS), Android Studio (Android) |
| CocoaPods | For iOS example (`bundle` + `pod` in `example/`) |

### Install

```bash
git clone https://github.com/rutviknabhoya/react-native-alternate-app-icon.git
cd react-native-alternate-app-icon
bun install
```

Build the library output consumed by the example app:

```bash
bun run build
```

If you change Nitro specs or generated bindings, regenerate native code:

```bash
bun run codegen
```

> `codegen` runs Nitrogen, rebuilds `lib/`, and applies the Android post-script. Commit any intentional changes under `nitrogen/` when they are part of your PR.

## Project layout

| Path | Purpose |
|------|---------|
| `src/` | TypeScript/JavaScript public API |
| `ios/`, `android/` | Native module implementations |
| `nitrogen/`, `nitro.json` | Nitro module configuration and generated bindings |
| `lib/` | Built package output (do not edit by hand) |
| `example/` | Runnable sample app (workspace) |

| `docs/` | Docusaurus documentation site (deployed to GitHub Pages) |

Live docs: **https://rutviknabhoya.github.io/react-native-alternate-app-icon/**

When you change the public API or platform setup steps, update the matching page under `docs/docs/` in the same PR when possible.

```bash
cd docs && bun install && bun start
```

CI runs **iOS** and **Android** builds on pull requests when relevant paths change. Documentation deploys on push to `main` when `docs/` changes. See `.github/workflows/` for details.

## Making changes

1. Create a branch from `main`.
2. Implement your change in `src/` and/or native code as needed.
3. Run `bun run build` (and `bun run codegen` if you touched Nitro interfaces).
4. Verify behavior in the [example app](#running-the-example-app).
5. Open a pull request against `main`.

Keep PRs focused: one logical change per PR is easier to review and release.

## Running the example app

From the repository root:

```bash
cd example
bun install   # if not already installed from root workspace
```

**iOS** (first time or after native dependency changes):

```bash
bun run pod
bun run ios
```

**Android**:

```bash
bun run android
```

**Metro** (separate terminal):

```bash
bun run start
```

Dynamic app icons require a device or simulator with alternate icons configured — see the [README](./README.md) for iOS and Android setup.

## Code style

The project uses **Prettier** and **ESLint** (React Native config). Settings live in `package.json`:

- Single quotes, 2-space indent, trailing commas (`es5`), no semicolons

Format and lint the example app when you change it:

```bash
cd example
bun run lint
```

Match existing naming and patterns in `src/` and native code; avoid drive-by refactors unrelated to your change.

## Commit messages

Releases use [Conventional Commits](https://www.conventionalcommits.org/) via [semantic-release](https://github.com/semantic-release/semantic-release). Use these types:

| Type | When to use |
|------|-------------|
| `feat` | New feature (minor release) |
| `fix` | Bug fix (patch) |
| `perf` | Performance improvement (patch) |
| `refactor` | Code change without behavior change (patch) |
| `docs` | Documentation only (patch) |
| `chore` | Tooling, deps, CI (patch) |

Examples:

```
feat: add support for resetting icon on Android cold start
fix: guard setIcon when alternate icons are unavailable
docs: clarify activity-alias naming in README
```

Breaking changes must include `BREAKING CHANGE:` in the commit body or use `feat!:` / `fix!:` in the subject for a **major** release.

## Pull requests

Use the [pull request template](https://github.com/rutviknabhoya/react-native-alternate-app-icon/blob/main/.github/pull_request_template.md) when opening a PR.

1. Fill in the PR description: **what** changed and **why**.
2. Link related issues (`Fixes #123`).
3. Confirm you tested on the platform(s) affected (iOS and/or Android).
4. Ensure CI checks pass (iOS/Android build workflows).
5. Wait for review; address feedback with additional commits or squashed updates as requested.

Maintainers may request changes or suggest splitting large PRs. Be patient and respectful — see the [Code of Conduct](./CODE_OF_CONDUCT.md).

## Reporting bugs

Use the [issue templates](https://github.com/rutviknabhoya/react-native-alternate-app-icon/issues/new/choose) (**Bug report**, **Feature request**, or **Documentation**) when opening an issue. They include the fields below; you can also use the chooser links for security advisories and the Code of Conduct.

When filing manually, include:

- Library version and `react-native` / `react-native-nitro-modules` versions
- Platform and OS version
- Minimal reproduction steps or a link to a branch
- Expected vs actual behavior
- Logs or screenshots if relevant

Security vulnerabilities should **not** be filed as public issues. Use [GitHub Security Advisories](https://github.com/rutviknabhoya/react-native-alternate-app-icon/security/advisories/new) or email the maintainer (see [Code of Conduct](./CODE_OF_CONDUCT.md)).

## Releases

Releases are automated with **semantic-release** on the `main` branch (maintainer-triggered workflow). Version bumps and changelog entries are derived from merged commit messages. Contributors do not need to manually bump `package.json` version in PRs unless a maintainer asks.

---

Questions? Open a [discussion or issue](https://github.com/rutviknabhoya/react-native-alternate-app-icon/issues) — we're happy to help you get started.
