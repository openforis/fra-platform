import { DescriptionValidationRedisRepository } from 'server/cache/repository/validation/description'
import { NationalDataPointValidationRedisRepository } from 'server/cache/repository/validation/nationalDataPoint'
import { TableValidationRedisRepository } from 'server/cache/repository/validation/table'

import { notifyDescriptionValidationUpdate } from './descriptions/notifyDescriptionValidationUpdate'
import { updateDescriptionValidations } from './descriptions/updateDescriptionValidations'
import { removeNDPValidation } from './nationalDataPoint/removeNDPValidation'
import { updateNDPValidations } from './nationalDataPoint/updateNDPValidations'
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
  removeDescriptionValidations: DescriptionValidationRedisRepository.removeValidations,
  removeNDPValidation,
  removeNDPValidations: NationalDataPointValidationRedisRepository.removeValidations,
  removeTableValidations: TableValidationRedisRepository.removeValidations,
  setNDPValidations: NationalDataPointValidationRedisRepository.setValidations,
  updateDescriptionValidations,
  updateNDPValidations,
  validateDataSources,
  validateDescriptions,
  validateNDPNationalClasses,
  validateNDPYear,
  validateNodes,
}
