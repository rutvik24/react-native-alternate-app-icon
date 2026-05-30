import type { HybridObject } from 'react-native-nitro-modules'

export interface AlternateAppIcon
  extends HybridObject<{ ios: 'swift'; android: 'kotlin' }> {
  getActiveIcon(): Promise<string>
  getAllAlternativeIcons(): Promise<string[]>
  setIcon(iconName: string): Promise<string>
  resetIcon(): Promise<string>
}
