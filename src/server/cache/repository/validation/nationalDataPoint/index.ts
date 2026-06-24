import { getValidations } from 'server/cache/repository/validation/nationalDataPoint/getValidations'
import { setValidations } from 'server/cache/repository/validation/nationalDataPoint/setValidations'

export const NationalDataPointValidationRedisRepository = {
  getValidations,
  setValidations,
}
