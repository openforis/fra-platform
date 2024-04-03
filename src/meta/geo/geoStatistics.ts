import { ExtraEstimation, ForestEstimations, ForestKey, LayerSectionKey } from 'meta/geo'

export type ExtraEstimationState = {
  errorKey: string | null
  isLoading: boolean
}

export type ExtraEstimationSectionState = Record<ExtraEstimation, ExtraEstimationState>

export type GeoStatisticsExtraEstimations = Record<LayerSectionKey, ExtraEstimationSectionState>

export type ForestEstimationEntry = {
  area: number
  fra1ALandAreaPercentage: number
  sourceName: string
  sourceKey: ForestKey | ExtraEstimation
}

export interface GeoStatisticsState {
  error: string | null
  extraEstimations: GeoStatisticsExtraEstimations
  forestEstimations: ForestEstimations | null
  isLoading: boolean
  tabularForestEstimations: Array<ForestEstimationEntry>
}
