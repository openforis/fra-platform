import { getBoundariesLayer } from './getBoundariesLayer'
import { getBounds } from './getBounds'
import { getBurnedAreaLayer } from './getBurnedAreaLayer'
import { getForestAgreementLayer } from './getForestAgreementLayer'
import { estimateForestAgreementArea, estimateIntersectionArea, getForestEstimations } from './getForestEstimations'
import { getForestLayer } from './getForestLayer'
import { getProtectedAreaLayer } from './getProtectedAreaLayer'

export const GeoController = {
  getForestLayer,
  getForestAgreementLayer,
  getBoundariesLayer,
  getForestEstimations,
  estimateForestAgreementArea,
  getBounds,
  getProtectedAreaLayer,
  getBurnedAreaLayer,
  estimateIntersectionArea,
}
