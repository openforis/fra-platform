import { copyValidations } from 'server/cache/repository/validation/nationalDataPoint/copyValidations'
import { deleteValidations } from 'server/cache/repository/validation/nationalDataPoint/deleteValidations'
import { getValidation } from 'server/cache/repository/validation/nationalDataPoint/getValidation'
import { getValidations } from 'server/cache/repository/validation/nationalDataPoint/getValidations'
import { removeValidations } from 'server/cache/repository/validation/nationalDataPoint/removeValidations'
import { renameValidations } from 'server/cache/repository/validation/nationalDataPoint/renameValidations'
import { setValidations } from 'server/cache/repository/validation/nationalDataPoint/setValidations'

export const NationalDataPointValidationRedisRepository = {
  copyValidations,
  deleteValidations,
  getValidation,
  getValidations,
  removeValidations,
  renameValidations,
  setValidations,
}
