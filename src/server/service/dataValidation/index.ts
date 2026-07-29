import { notifyDescriptionValidationUpdate } from './descriptions/notifyDescriptionValidationUpdate'
import { notifyNationalDataPointValidationUpdate } from './nationalDataPoint/notifyNationalDataPointValidationUpdate'
import { removeNDPValidation } from './nationalDataPoint/removeNDPValidation'
import { validateNDPNationalClasses } from './nationalDataPoint/validateNDPNationalClasses'
import { validateNDPYear } from './nationalDataPoint/validateNDPYear'
import { validateDataSources } from './validateDataSources'
import { validateDescriptions } from './validateDescriptions'
import { validateNodes } from './validateNodes'

export const DataValidationService = {
  notifyDescriptionValidationUpdate,
  notifyNationalDataPointValidationUpdate,
  removeNDPValidation,
  validateDataSources,
  validateDescriptions,
  validateNDPNationalClasses,
  validateNDPYear,
  validateNodes,
}
