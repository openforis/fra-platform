import { deleteValidations } from 'server/cache/repository/validation/description/deleteValidations'
import { getValidations } from 'server/cache/repository/validation/description/getValidations'
import { removeValidations } from 'server/cache/repository/validation/description/removeValidations'
import { setValidations } from 'server/cache/repository/validation/description/setValidations'

export const DescriptionValidationRedisRepository = {
  deleteValidations,
  getValidations,
  removeValidations,
  setValidations,
}
