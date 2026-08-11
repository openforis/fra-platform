import { copyValidations } from 'server/cache/repository/validation/table/copyValidations'
import { getValidations } from 'server/cache/repository/validation/table/getValidations'
import { removeValidations } from 'server/cache/repository/validation/table/removeValidations'
import { renameValidations } from 'server/cache/repository/validation/table/renameValidations'
import { setValidations } from 'server/cache/repository/validation/table/setValidations'

export const TableValidationRedisRepository = {
  copyValidations,
  getValidations,
  removeValidations,
  renameValidations,
  setValidations,
}
