import { getTableValidations } from 'server/cache/repository/validation/getTableValidations'
import { setTableValidations } from 'server/cache/repository/validation/setTableValidations'

export const ValidationRedisRepository = {
  getTableValidations,
  setTableValidations,
}
