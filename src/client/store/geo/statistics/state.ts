import { ExtraEstimation, ForestEstimations, LayerSectionKey } from 'meta/geo'
import { ForestEstimationEntry } from 'meta/geo/geoStatistics'

export type ExtraEstimationState = {
  errorKey: string | null
  loading: boolean
}

export type ExtraEstimationsSectionState = Record<ExtraEstimation, ExtraEstimationState>

export type ExtraEstimationsState = Record<LayerSectionKey, ExtraEstimationsSectionState>

export type GeoStatisticsState = {
  errorKey: string | null
  extraEstimations: ExtraEstimationsState
  forestEstimations: ForestEstimations | null
  forestEstimationsTableData: Array<ForestEstimationEntry>
  loading: boolean
}

export const initialState = {} as GeoStatisticsState
