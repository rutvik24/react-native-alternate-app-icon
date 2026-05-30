# Documentation site

Docusaurus site for **react-native-alternate-app-icon**, hosted on GitHub Pages at:

**https://rutvik24.github.io/react-native-alternate-app-icon/**

## Development

```bash
cd docs
bun install
bun start   # copies demo videos from ../assets/ automatically
```

Demo videos are synced from the package `assets/` folder into `static/media/` before `start` and `build`.

Open [http://localhost:3000/react-native-alternate-app-icon/](http://localhost:3000/react-native-alternate-app-icon/).

## Build

```bash
bun run build
bun run serve
```

## Project layout

| Path | Purpose |
| --- | --- |
| `docs/docs/` | Documentation pages (MDX) |
| `src/` | Homepage and React components |
| `static/` | Images and demo videos |
| `docusaurus.config.ts` | Site configuration |

## Deployment

Pushes to `main` that touch `docs/` deploy via [`.github/workflows/docs.yml`](../.github/workflows/docs.yml).

Enable **Settings → Pages → Build and deployment → GitHub Actions** in the library repository.
