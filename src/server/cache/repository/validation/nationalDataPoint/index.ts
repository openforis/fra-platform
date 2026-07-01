import { deleteValidation } from 'server/cache/repository/validation/nationalDataPoint/deleteValidation'
import { getValidation } from 'server/cache/repository/validation/nationalDataPoint/getValidation'
import { getValidations } from 'server/cache/repository/validation/nationalDataPoint/getValidations'
import { setValidations } from 'server/cache/repository/validation/nationalDataPoint/setValidations'

export const NationalDataPointValidationRedisRepository = {
  deleteValidation,
  getValidation,
  getValidations,
  setValidations,
}
