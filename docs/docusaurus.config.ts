import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const repoUrl =
  'https://github.com/rutviknabhoya/react-native-alternate-app-icon';

const config: Config = {
  title: 'React Native Alternate App Icon',
  tagline: 'Runtime app icon switching for React Native on iOS and Android.',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
  },

  url: 'https://rutviknabhoya.github.io',
  baseUrl: '/react-native-alternate-app-icon/',

  organizationName: 'rutviknabhoya',
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
          'react native, app icon, dynamic icon, nitro modules, ios, android',
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
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
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
            {label: 'Introduction', to: '/docs/intro'},
            {label: 'Installation', to: '/docs/getting-started/installation'},
            {label: 'API Reference', to: '/docs/api/overview'},
          ],
        },
        {
          title: 'Platform setup',
          items: [
            {label: 'iOS', to: '/docs/ios/setup'},
            {label: 'Android', to: '/docs/android/setup'},
            {label: 'Platform notes', to: '/docs/guides/platform-notes'},
          ],
        },
        {
          title: 'Community',
          items: [
            {label: 'Issues', href: `${repoUrl}/issues`},
            {label: 'Contributing', to: '/docs/contributing'},
            {label: 'Example app', href: `${repoUrl}/tree/main/example`},
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
};

export default config;
