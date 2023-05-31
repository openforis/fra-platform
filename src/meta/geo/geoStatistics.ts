import { ForestEstimations } from 'meta/geo'

export interface GeoStatisticsState {
  forestEstimations: ForestEstimations | null
  tabularEstimationData: [string, number, number][]
  isLoading: boolean
  error: string | null
}
