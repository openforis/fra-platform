import { copyValidations } from 'server/cache/repository/validation/description/copyValidations'
import { deleteValidations } from 'server/cache/repository/validation/description/deleteValidations'
import { getValidations } from 'server/cache/repository/validation/description/getValidations'
import { removeValidations } from 'server/cache/repository/validation/description/removeValidations'
import { renameValidations } from 'server/cache/repository/validation/description/renameValidations'
import { setValidations } from 'server/cache/repository/validation/description/setValidations'

export const DescriptionValidationRedisRepository = {
  copyValidations,
  deleteValidations,
  getValidations,
  removeValidations,
  renameValidations,
  setValidations,
}
