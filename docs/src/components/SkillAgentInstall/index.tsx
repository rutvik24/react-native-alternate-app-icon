import type {ReactNode} from 'react';
import {useCallback, useState} from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export const SKILL_GITHUB_REPO = 'rutvik24/react-native-alternate-app-icon';
export const SKILL_NAME = 'react-native-alternate-app-icon';

export type SkillAgentId =
  | 'cursor'
  | 'claude-code'
  | 'github-copilot'
  | 'codex'
  | 'windsurf'
  | 'gemini-cli'
  | 'antigravity'
  | 'cline'
  | 'continue'
  | 'opencode'
  | 'roo'
  | 'junie'
  | 'kiro-cli'
  | 'amp';

const ADD_LABELS: Record<SkillAgentId, string> = {
  cursor: 'Add to Cursor',
  'claude-code': 'Add to Claude Code',
  'github-copilot': 'Add to GitHub Copilot',
  codex: 'Add to Codex',
  windsurf: 'Add to Windsurf',
  'gemini-cli': 'Add to Gemini CLI',
  antigravity: 'Add to Antigravity',
  cline: 'Add to Cline',
  continue: 'Add to Continue',
  opencode: 'Add to OpenCode',
  roo: 'Add to Roo Code',
  junie: 'Add to JetBrains Junie',
  'kiro-cli': 'Add to Kiro CLI',
  amp: 'Add to Amp',
};

export function buildSkillInstallCommand(
  agent?: SkillAgentId,
  global = true,
): string {
  const parts = [
    'npx',
    'skills',
    'add',
    SKILL_GITHUB_REPO,
    '--skill',
    SKILL_NAME,
  ];
  if (agent) {
    parts.push('-a', agent);
  }
  if (global) {
    parts.push('-g');
  }
  parts.push('-y');
  return parts.join(' ');
}

type SkillAgentInstallProps = {
  agent?: SkillAgentId;
  global?: boolean;
  label?: string;
};

export default function SkillAgentInstall({
  agent,
  global = true,
  label,
}: SkillAgentInstallProps): ReactNode {
  const [copied, setCopied] = useState(false);
  const command = buildSkillInstallCommand(agent, global);
  const buttonLabel =
    label ?? (agent ? ADD_LABELS[agent] : 'Add skill (all agents)');

  const onClick = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.prompt('Copy this command:', command);
    }
  }, [command]);

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={clsx(styles.button, copied && styles.buttonCopied)}
        onClick={onClick}
        aria-label={`${buttonLabel}. Copies: ${command}`}>
        <span className={styles.buttonIcon} aria-hidden>
          {copied ? '✓' : '+'}
        </span>
        {copied ? 'Copied to clipboard' : buttonLabel}
      </button>
      <p className={styles.hint}>
        Copies the{' '}
        <a href="https://skills.sh/docs/cli" rel="noopener noreferrer">
          Skills CLI
        </a>{' '}
        command — paste in a terminal, then restart your agent.
      </p>
    </div>
  );
}
