import { DescriptionValidationRedisRepository } from 'server/cache/repository/validation/description'
import { NationalDataPointValidationRedisRepository } from 'server/cache/repository/validation/nationalDataPoint'
import { TableValidationRedisRepository } from 'server/cache/repository/validation/table'

import { notifyDescriptionValidationUpdate } from './descriptions/notifyDescriptionValidationUpdate'
import { notifyNationalDataPointValidationUpdate } from './nationalDataPoint/notifyNationalDataPointValidationUpdate'
import { removeNDPValidation } from './nationalDataPoint/removeNDPValidation'
import { validateNDPNationalClasses } from './nationalDataPoint/validateNDPNationalClasses'
import { validateNDPYear } from './nationalDataPoint/validateNDPYear'
import { getValidationSummary } from './summary/getValidationSummary'
import { validateDataSources } from './validateDataSources'
import { validateDescriptions } from './validateDescriptions'
import { validateNodes } from './validateNodes'

export const DataValidationService = {
  getDescriptionValidations: DescriptionValidationRedisRepository.getValidations,
  getNationalDataPointValidations: NationalDataPointValidationRedisRepository.getValidations,
  getTableValidations: TableValidationRedisRepository.getValidations,
  getValidationSummary,
  notifyDescriptionValidationUpdate,
  notifyNationalDataPointValidationUpdate,
  removeDescriptionValidations: DescriptionValidationRedisRepository.removeValidations,
  removeNDPValidation,
  removeNDPValidations: NationalDataPointValidationRedisRepository.removeValidations,
  removeTableValidations: TableValidationRedisRepository.removeValidations,
  validateDataSources,
  validateDescriptions,
  validateNDPNationalClasses,
  validateNDPYear,
  validateNodes,
}
