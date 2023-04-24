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
