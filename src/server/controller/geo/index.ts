import { getBoundariesLayer } from './getBoundariesLayer'
import { getBounds } from './getBounds'
import { getBurnedAreaLayer } from './getBurnedAreaLayer'
import { estimateImageArea, estimateIntersectionArea, getForestEstimations } from './getForestEstimations'
import { getForestLayer } from './getForestLayer'
import { getProtectedAreaLayer } from './getProtectedAreaLayer'

export const GeoController = {
  getForestLayer,
  getBoundariesLayer,
  getForestEstimations,
  estimateImageArea,
  getBounds,
  getProtectedAreaLayer,
  getBurnedAreaLayer,
  estimateIntersectionArea,
}
