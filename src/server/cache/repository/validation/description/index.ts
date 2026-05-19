import { getDescriptionValidations } from 'server/cache/repository/validation/description/getDescriptionValidations'
import { setDescriptionValidations } from 'server/cache/repository/validation/description/setDescriptionValidations'
import { updateTextDescriptionValidation } from 'server/cache/repository/validation/description/updateTextDescriptionValidation'

export const DescriptionValidationRedisRepository = {
  getDescriptionValidations,
  setDescriptionValidations,
  updateTextDescriptionValidation,
}
