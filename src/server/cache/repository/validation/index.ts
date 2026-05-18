import { clearCountryValidations } from 'server/cache/repository/validation/clearCountryValidations'
import { getDescriptionValidations } from 'server/cache/repository/validation/getDescriptionValidations'
import { getTableValidations } from 'server/cache/repository/validation/getTableValidations'
import { setDescriptionValidations } from 'server/cache/repository/validation/setDescriptionValidations'
import { setTableValidations } from 'server/cache/repository/validation/setTableValidations'

export const ValidationRedisRepository = {
  clearCountryValidations,
  getDescriptionValidations,
  getTableValidations,
  setDescriptionValidations,
  setTableValidations,
}
