import { NitroModules } from 'react-native-nitro-modules'
import type { AlternateAppIcon as AlternateAppIconSpec } from './specs/alternate-app-icon.nitro'

const alternateAppIcon =
  NitroModules.createHybridObject<AlternateAppIconSpec>('AlternateAppIcon')

export { alternateAppIcon as AlternateAppIcon }

export function getActiveIcon(): Promise<string> {
  return alternateAppIcon.getActiveIcon()
}

export function getAllAlternativeIcons(): Promise<string[]> {
  return alternateAppIcon.getAllAlternativeIcons()
}

export function setIcon(iconName: string): Promise<string> {
  return alternateAppIcon.setIcon(iconName)
}

export function resetIcon(): Promise<string> {
  return alternateAppIcon.resetIcon()
}
