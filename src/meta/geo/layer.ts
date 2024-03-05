import { BurnedAreaKey } from './burnedAreaSource'
import { ForestKey } from './forest'
import { ProtectedAreaKey } from './protectedAreaSource'

export type LayerConfig = {
  mapId: string
  palette: Array<string>
  year?: number
  scale?: number
  citation?: string
}

export type LayerKey = ForestKey | ProtectedAreaKey | BurnedAreaKey

export interface LayerSource {
  key: LayerKey
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
  layers: Array<LayerSource>
  forestAreaDataProperty: string
  labelKey: string
}

export const CUSTOM_RECIPE_KEY = 'custom'

export type LayerMetadata = {
  scale?: number
  palette?: Array<string>
  citation?: string
  forestAreaDataProperty?: string
  title?: string
}

export type LayerOptions = {
  gteTreeCoverPercent?: Array<number>
  agreementLayer?: { agreementLevels: Array<number>; reducerScales: Array<number> }
  years?: Array<number>
}

export type Layer = {
  key: LayerKey
  isCustomAsset?: boolean
  options?: LayerOptions
  metadata?: LayerMetadata
}

export enum LayerControlType {
  TreeCoverPercent = 'TreeCoverPercent',
  Year = 'Year',
  CustomAsset = 'CustomAsset',
  Agreement = 'Agreement',
}

export enum LayerSectionKey {
  Forest = 'Forest',
  ProtectedArea = 'ProtectedArea',
  BurnedArea = 'BurnedArea',
}

export type LayerSection = {
  key: LayerSectionKey
  title: string
  layers: Array<Layer>
  recipes?: Array<Recipe>
}
