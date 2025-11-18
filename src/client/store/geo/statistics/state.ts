import { ExtraEstimation } from 'meta/geo/extraEstimation/extraEstimation'
import { ForestEstimationEntry } from 'meta/geo/forest/estimationEntry'
import { ForestEstimations } from 'meta/geo/forest/estimations'
import { LayerSectionKey } from 'meta/geo/layer/sectionKey'

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
