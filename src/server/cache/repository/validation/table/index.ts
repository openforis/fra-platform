import { clearCountryValidations } from 'server/cache/repository/validation/table/clearCountryValidations'
import { getValidations } from 'server/cache/repository/validation/table/getValidations'
import { setValidations } from 'server/cache/repository/validation/table/setValidations'

export const TableValidationRedisRepository = {
  clearCountryValidations,
  getValidations,
  setValidations,
}
