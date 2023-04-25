import { BurnedAreaKey } from './burnedAreaSource'
import { ForestKey, HansenPercentage } from './forest'
import { ProtectedAreaKey } from './protectedAreaSource'

export type LayerConfig = {
  mapId: string
  palette: Array<string>
  year?: number
  scale?: number
  citation?: string
}

export interface LayerSource {
  key: ForestKey | ProtectedAreaKey | BurnedAreaKey
  options?: {
    gteTreeCoverPercent?: number
    assetId?: string
    year?: number
    agreement?: {
      layers: Array<LayerSource>
      gteAgreementLevel: number
    }
  }
}

export interface Recipe {
  layers: Array<ForestKey>
  gteHansenTreeCoverPerc?: HansenPercentage
  forestAreaDataProperty: string
  recipeLabel: string
}

export type LayerMetadata = {
  scale?: number
  palette?: Array<string>
  citation?: string
  forestAreaDataProperty?: string
}

export type LayerOptions = {
  minTreeCoverPercentage?: Array<number>
  agreementLayer?: { agreementLevels: Array<number>; reducerScales: Array<number> }
  years?: Array<number>
}

export type Layer = {
  key: ForestKey | ProtectedAreaKey | BurnedAreaKey
  isCustomAsset?: boolean
  options?: LayerOptions
  metadata?: LayerMetadata
}

export enum LayerSectionKey {
  Forest = 'Forest',
  ProtectedArea = 'ProtectedArea',
  BurnedArea = 'BurnedArea',
}

export type LayerSection = {
  key: LayerSectionKey
  layers: Array<Layer>
  recipes?: Array<Recipe>
}
