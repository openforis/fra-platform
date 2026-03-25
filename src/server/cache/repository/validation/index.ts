import { getTableValidations } from 'server/cache/repository/validation/getTableValidations'
import { setValidation } from 'server/cache/repository/validation/setValidation'
import { unsetValidation } from 'server/cache/repository/validation/unsetValidation'

export const ValidationRedisRepository = {
  getTableValidations,
  setValidation,
  unsetValidation,
}
