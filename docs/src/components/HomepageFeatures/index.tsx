import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Runtime icon switching',
    icon: '🎨',
    description: (
      <>
        Swap launcher icons for seasons, events, or user themes without a new
        store build — on both iOS and Android.
      </>
    ),
  },
  {
    title: 'One JavaScript API',
    icon: '⚡',
    description: (
      <>
        Use <code>setIcon</code>, <code>getActiveIcon</code>, and{' '}
        <code>resetIcon</code> everywhere. Native Swift and Kotlin powered by
        Nitro Modules.
      </>
    ),
  },
  {
    title: 'New Architecture ready',
    icon: '🚀',
    description: (
      <>
        Built for modern React Native with Fabric and TurboModules. Type-safe
        bindings from TypeScript specs.
      </>
    ),
  },
  {
    title: 'Agent skill',
    icon: '🤖',
    description: (
      <>
        Installable skill for Cursor, Claude Code, Copilot, and 50+ agents —
        correct native setup without pasting docs.{' '}
        <Link to="/docs/agents/skill">Add to Cursor →</Link>
      </>
    ),
  },
];

function Feature({title, icon, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4', 'margin-bottom--lg')}>
      <div className={clsx('feature-card', styles.featureCard)}>
        <div className="feature-icon">{icon}</div>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
