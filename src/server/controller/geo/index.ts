import { getBoundariesLayer } from './getBoundariesLayer'
import { getBounds } from './getBounds'
import { getBurnedAreaLayer } from './getBurnedAreaLayer'
import { estimateImageArea, estimateIntersectionArea, getForestEstimations } from './getForestEstimations'
import { getForestLayer } from './getForestLayer'
import { getProtectedAreaLayer } from './getProtectedAreaLayer'
import { getUNBoundariesLayer } from './getUNBoundariesLayer'

export const GeoController = {
  estimateImageArea,
  estimateIntersectionArea,
  getBoundariesLayer,
  getBounds,
  getBurnedAreaLayer,
  getForestEstimations,
  getForestLayer,
  getProtectedAreaLayer,
  getUNBoundariesLayer,
}
