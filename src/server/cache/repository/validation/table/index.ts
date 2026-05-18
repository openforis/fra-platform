import { clearCountryValidations } from 'server/cache/repository/validation/table/clearCountryValidations'
import { getTableValidations } from 'server/cache/repository/validation/table/getTableValidations'
import { setTableValidations } from 'server/cache/repository/validation/table/setTableValidations'

export const TableValidationRedisRepository = {
  clearCountryValidations,
  getTableValidations,
  setTableValidations,
}
