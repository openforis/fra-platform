import { BurnedAreaKey, BurnedAreasUIOptions } from './burnedAreaSource'
import { ForestKey, HansenPercentage } from './forest'
import { ProtectedAreaKey } from './protectedAreaSource'

export type MapPanel = null | 'mosaic' | 'data' | 'recipes' | 'statistics'

export enum LayerStatus {
  loading = 'loading',
  failed = 'failed',
  ready = 'ready',
}

export interface ForestOptions {
  selected: ForestKey[]
  fetchedLayers: { [key: string]: string }
  pendingLayers: { [key: string]: string }
  failedLayers: { [key: string]: string }
  opacity: { [key: string]: number }
  hansenPercentage: HansenPercentage
  agreementLayerSelected: boolean
  agreementLayerStatus: LayerStatus
  agreementLevel: number
  agreementPalette: Array<string>
  recipe: string
  customAssetId: string
}

export interface ProtectedAreasOptions {
  selected: ProtectedAreaKey[]
  fetchedLayers: { [key: string]: string }
  pendingLayers: { [key: string]: string }
  failedLayers: { [key: string]: string }
  opacity: { [key: string]: number }
  customAssetId: string
}

export interface BurnedAreasOptions {
  ui: BurnedAreasUIOptions
  applied: BurnedAreasUIOptions
  selected: BurnedAreaKey[]
  fetchedLayers: { [key: string]: string }
  pendingLayers: { [key: string]: string }
  failedLayers: { [key: string]: string }
  opacity: { [key: string]: number }
}
