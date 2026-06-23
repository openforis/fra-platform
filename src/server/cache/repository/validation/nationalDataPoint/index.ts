import { getValidations } from 'server/cache/repository/validation/nationalDataPoint/getValidations'
import { setValidations } from 'server/cache/repository/validation/nationalDataPoint/setValidations'
import { updateValidations } from 'server/cache/repository/validation/nationalDataPoint/updateValidations'

export const NationalDataPointValidationRedisRepository = {
  getValidations,
  setValidations,
  updateValidations,
}
