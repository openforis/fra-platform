import { authenticateToGee } from './authenticateToGee'
import { getBoundariesLayer } from './getBoundariesLayer'
import { getForestAgreementLayer } from './getForestAgreementLayer'
import { getForestLayer } from './getForestLayer'

export const GeoController = {
  authenticateToGee,
  getForestLayer,
  getForestAgreementLayer,
  getBoundariesLayer,
}
