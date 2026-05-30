import { NitroModules } from 'react-native-nitro-modules'
import type { AlternateAppIcon as AlternateAppIconSpec } from './specs/alternate-app-icon.nitro'

export const AlternateAppIcon =
  NitroModules.createHybridObject<AlternateAppIconSpec>('AlternateAppIcon')