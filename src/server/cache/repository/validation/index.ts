import { getSummary } from 'server/cache/repository/validation/getSummary'
import { getTableValidations } from 'server/cache/repository/validation/getTableValidations'
import { setSummary } from 'server/cache/repository/validation/setSummary'
import { setTableValidations } from 'server/cache/repository/validation/setTableValidations'

export const ValidationRedisRepository = {
  getSummary,
  getTableValidations,
  setSummary,
  setTableValidations,
}
