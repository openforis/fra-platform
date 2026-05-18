import { clearCountryValidations } from 'server/cache/repository/validation/clearCountryValidations'
import { getDescriptionValidations } from 'server/cache/repository/validation/getDescriptionValidations'
import { getTableValidations } from 'server/cache/repository/validation/getTableValidations'
import { setDescriptionValidations } from 'server/cache/repository/validation/setDescriptionValidations'
import { setTableValidations } from 'server/cache/repository/validation/setTableValidations'
import { updateTextDescriptionValidation } from 'server/cache/repository/validation/updateTextDescriptionValidation'

export const DescriptionValidationRedisRepository = {
  getDescriptionValidations,
  setDescriptionValidations,
  updateTextDescriptionValidation,
}

export const TableValidationRedisRepository = {
  clearCountryValidations,
  getTableValidations,
  setTableValidations,
}
