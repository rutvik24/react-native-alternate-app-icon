import CodeBlock from '@theme/CodeBlock';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

const PACKAGE_MANAGER_GROUP = 'package-manager';

type PackageManagerCommands = {
  bun: string;
  npm: string;
  yarn: string;
};

type PackageManagerTabsProps = {
  commands: PackageManagerCommands;
  groupId?: string;
};

export default function PackageManagerTabs({
  commands,
  groupId = PACKAGE_MANAGER_GROUP,
}: PackageManagerTabsProps) {
  return (
    <Tabs groupId={groupId} defaultValue="bun" values={[
      {label: 'bun', value: 'bun'},
      {label: 'npm', value: 'npm'},
      {label: 'yarn', value: 'yarn'},
    ]}>
      <TabItem value="bun">
        <CodeBlock language="bash">{commands.bun}</CodeBlock>
      </TabItem>
      <TabItem value="npm">
        <CodeBlock language="bash">{commands.npm}</CodeBlock>
      </TabItem>
      <TabItem value="yarn">
        <CodeBlock language="bash">{commands.yarn}</CodeBlock>
      </TabItem>
    </Tabs>
  );
}

const LIBRARY_PACKAGES =
  'react-native-alternate-app-icon react-native-nitro-modules@0.32.0';

export function InstallPackages() {
  return (
    <PackageManagerTabs
      commands={{
        bun: `bun add ${LIBRARY_PACKAGES}`,
        npm: `npm install ${LIBRARY_PACKAGES}`,
        yarn: `yarn add ${LIBRARY_PACKAGES}`,
      }}
    />
  );
}

export function QuickStartInstall() {
  return (
    <PackageManagerTabs
      commands={{
        bun: `bun add ${LIBRARY_PACKAGES}\ncd ios && pod install`,
        npm: `npm install ${LIBRARY_PACKAGES}\ncd ios && pod install`,
        yarn: `yarn add ${LIBRARY_PACKAGES}\ncd ios && pod install`,
      }}
    />
  );
}

export function RebuildNativeApps() {
  return (
    <PackageManagerTabs
      commands={{
        bun: `# iOS\nbunx react-native run-ios\n\n# Android\nbunx react-native run-android`,
        npm: `# iOS\nnpx react-native run-ios\n\n# Android\nnpx react-native run-android`,
        yarn: `# iOS\nyarn react-native run-ios\n\n# Android\nyarn react-native run-android`,
      }}
    />
  );
}

export function DocsDevStart() {
  return (
    <PackageManagerTabs
      groupId="docs-package-manager"
      commands={{
        bun: 'cd docs\nbun install\nbun start',
        npm: 'cd docs\nnpm install\nnpm start',
        yarn: 'cd docs\nyarn install\nyarn start',
      }}
    />
  );
}

export function DocsDevBuild() {
  return (
    <PackageManagerTabs
      groupId="docs-package-manager"
      commands={{
        bun: 'bun run build\nbun run serve',
        npm: 'npm run build\nnpm run serve',
        yarn: 'yarn build\nyarn serve',
      }}
    />
  );
}
