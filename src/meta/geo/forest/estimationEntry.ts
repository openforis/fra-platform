import { ExtraEstimation } from 'meta/geo/extraEstimation/extraEstimation'
import { ForestKey } from 'meta/geo/forest/key'

export type ForestEstimationEntry = {
  area: number
  fra1ALandAreaPercentage: number
  hansenPercent?: number
  sourceKey: ForestKey | ExtraEstimation
  sourceLabelKey: string
}
