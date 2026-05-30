import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className={clsx('container', styles.heroContainer)}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>Nitro Modules · iOS & Android</div>
          <Heading as="h1" className={clsx('hero__title', styles.heroTitle)}>
            {siteConfig.title}
          </Heading>
          <div className={styles.heroSubtitle}>
            <p className={styles.heroSubtitleLine}>
              Change your app icon at runtime on iOS and Android.
            </p>
            <span className={styles.heroSubtitleAccent}>
              Powered by Nitro Modules
            </span>
          </div>
          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/docs/getting-started/installation">
              Get started
            </Link>
            <Link
              className={clsx(
                'button button--outline button--lg',
                styles.outlineButton,
              )}
              to="/docs/api/overview">
              API reference
            </Link>
          </div>
          <div className={styles.codeSnippet} role="note" aria-label="Example API call">
            <span className={styles.codeSnippetText}>
              await setIcon('AlternativeIcon')
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Change your React Native app icon at runtime on iOS and Android.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
