import { getNationalDataPointValidations } from 'server/cache/repository/validation/nationalDataPoint/getNationalDataPointValidations'
import { setNationalDataPointValidations } from 'server/cache/repository/validation/nationalDataPoint/setNationalDataPointValidations'

export const NationalDataPointValidationRedisRepository = {
  getNationalDataPointValidations,
  setNationalDataPointValidations,
}
