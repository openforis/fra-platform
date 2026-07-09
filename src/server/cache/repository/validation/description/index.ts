import { deleteValidations } from 'server/cache/repository/validation/description/deleteValidations'
import { getValidations } from 'server/cache/repository/validation/description/getValidations'
import { setValidations } from 'server/cache/repository/validation/description/setValidations'

export const DescriptionValidationRedisRepository = {
  deleteValidations,
  getValidations,
  setValidations,
}
