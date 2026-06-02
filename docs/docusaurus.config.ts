import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'

const repoUrl = 'https://github.com/rutvik24/react-native-alternate-app-icon'

const config: Config = {
  title: 'React Native Alternate App Icon',
  tagline:
    'The most powerful App Icon Changer for React Native. Change your app icon dynamically at runtime on iOS and Android.',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
  },

  url: 'https://rutvik24.github.io',
  baseUrl: '/react-native-alternate-app-icon/',

  organizationName: 'rutvik24',
  projectName: 'react-native-alternate-app-icon',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: 'docs',
          sidebarPath: './sidebars.ts',
          editUrl: `${repoUrl}/tree/main/docs/`,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    metadata: [
      {
        name: 'keywords',
        content:
          'react native, app icon changer, change app icon, dynamic app icon, alternate app icon, nitro modules, ios, android, runtime icon switch',
      },
      {
        name: 'description',
        content:
          'Best React Native library to change app icon at runtime. High-performance, Nitro-powered, supports iOS and Android. Dynamic app icon changer.',
      },
      {
        property: 'og:title',
        content: 'React Native Alternate App Icon | App Icon Changer',
      },
      {
        property: 'og:description',
        content:
          'Dynamically change your React Native app icon on iOS and Android at runtime with high performance.',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Alternate App Icon',
      logo: {
        alt: 'Alternate App Icon',
        src: 'img/logo.svg',
        width: 32,
        height: 32,
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'docSidebar',
          sidebarId: 'agentsSidebar',
          position: 'left',
          label: 'Agents',
        },
        {
          label: 'Agent skill',
          to: '/docs/agents/skill',
          position: 'right',
        },
        {
          href: 'https://www.npmjs.com/package/react-native-alternate-app-icon',
          label: 'npm',
          position: 'right',
        },
        {
          href: repoUrl,
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            { label: 'Introduction', to: '/docs/intro' },
            { label: 'Installation', to: '/docs/getting-started/installation' },
            { label: 'API Reference', to: '/docs/api/overview' },
          ],
        },
        {
          title: 'Platform setup',
          items: [
            { label: 'iOS', to: '/docs/ios/setup' },
            { label: 'Android', to: '/docs/android/setup' },
            { label: 'Platform notes', to: '/docs/guides/platform-notes' },
          ],
        },
        {
          title: 'Agents',
          items: [
            { label: 'For AI agents', to: '/docs/agents/overview' },
            { label: 'Install agent skill', to: '/docs/agents/skill' },
            { label: 'Rules & workflow', to: '/docs/agents/rules' },
            {
              label: 'Skill source (GitHub)',
              href: `${repoUrl}/tree/main/skills/react-native-alternate-app-icon`,
            },
            { label: 'List on skills.sh', to: '/docs/agents/skills-sh' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'Issues', href: `${repoUrl}/issues` },
            { label: 'Contributing', to: '/docs/contributing' },
            { label: 'Example app', href: `${repoUrl}/tree/main/example` },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Rutvik Nabhoya. MIT License.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'kotlin', 'swift'],
    },
  } satisfies Preset.ThemeConfig,
}

export default config
