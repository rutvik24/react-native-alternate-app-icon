import Admonition from '@theme/Admonition';
import type {ReactNode} from 'react';

type AdmonitionProps = {
  title?: string;
  children: ReactNode;
};

export function Tip({title, children}: AdmonitionProps) {
  return (
    <Admonition type="tip" title={title}>
      {children}
    </Admonition>
  );
}

export function Info({title, children}: AdmonitionProps) {
  return (
    <Admonition type="info" title={title}>
      {children}
    </Admonition>
  );
}
