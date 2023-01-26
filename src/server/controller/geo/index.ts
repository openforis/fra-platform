import { getBoundariesLayer } from './getBoundariesLayer'
import { getForestAgreementLayer } from './getForestAgreementLayer'
import { estimateForestAgreementArea, getForestEstimations } from './getForestEstimations'
import { getForestLayer } from './getForestLayer'

export const GeoController = {
  getForestLayer,
  getForestAgreementLayer,
  getBoundariesLayer,
  getForestEstimations,
  estimateForestAgreementArea,
}
