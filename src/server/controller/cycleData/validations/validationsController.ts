import { DescriptionValidationRedisRepository } from 'server/cache/repository/validation/description'
import { NationalDataPointValidationRedisRepository } from 'server/cache/repository/validation/nationalDataPoint'
import { TableValidationRedisRepository } from 'server/cache/repository/validation/table'
import { getValidationSummary } from 'server/controller/cycleData/validations/summary/getSummary'

export const ValidationsController = {
  getDescriptionValidations: DescriptionValidationRedisRepository.getValidations,
  getNationalDataPointValidations: NationalDataPointValidationRedisRepository.getValidations,
  getTableValidations: TableValidationRedisRepository.getValidations,
  getValidationSummary,
}
