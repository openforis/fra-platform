import { DescriptionValidationRedisRepository } from 'server/cache/repository/validation/description'
import { TableValidationRedisRepository } from 'server/cache/repository/validation/table'
import { getValidationSummary } from 'server/controller/cycleData/validations/summary/getSummary'

export const ValidationsController = {
  getDescriptionValidations: DescriptionValidationRedisRepository.getDescriptionValidations,
  getTableValidations: TableValidationRedisRepository.getTableValidations,
  getValidationSummary,
}
