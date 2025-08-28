import { ExtraEstimation, ForestKey } from 'meta/geo'

export type ForestEstimationEntry = {
  area: number
  fra1ALandAreaPercentage: number
  hansenPercent?: number
  sourceKey: ForestKey | ExtraEstimation
  sourceLabelKey: string
}
