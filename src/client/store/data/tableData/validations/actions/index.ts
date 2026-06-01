import { getDescriptionValidations } from 'client/store/data/tableData/validations/actions/getDescriptionValidations'
import { getSummary } from 'client/store/data/tableData/validations/actions/getSummary'
import { getTableValidations } from 'client/store/data/tableData/validations/actions/getTableValidations'
import { removeValidations } from 'client/store/data/tableData/validations/actions/removeValidations'
import { setDescriptionValidations } from 'client/store/data/tableData/validations/actions/setDescriptionValidations'
import { setNodeValueValidations } from 'client/store/data/tableData/validations/actions/setNodeValueValidations'

export const ValidationsActions = {
  getDescriptionValidations,
  getSummary,
  getTableValidations,
  removeValidations,
  setDescriptionValidations,
  setNodeValueValidations,
}
