import { ExtraEstimation, ForestEstimations, LayerSectionKey } from 'meta/geo'

export type ExtraEstimationState = {
  errorKey: string | null
  isLoading: boolean
}

export type ExtraEstimationSectionState = Record<ExtraEstimation, ExtraEstimationState>

export type GeoStatisticsExtraEstimations = Record<LayerSectionKey, ExtraEstimationSectionState>

export interface GeoStatisticsState {
  forestEstimations: ForestEstimations | null
  tabularEstimationData: [string, number, number, string][]
  isLoading: boolean
  error: string | null
  extraEstimations: GeoStatisticsExtraEstimations
}
