import { getSummary } from 'client/store/data/tableData/validations/actions/getSummary'
import { getTableValidations } from 'client/store/data/tableData/validations/actions/getTableValidations'
import { removeValidations } from 'client/store/data/tableData/validations/actions/removeValidations'
import { setNodeValueValidations } from 'client/store/data/tableData/validations/actions/setNodeValueValidations'

export const ValidationsActions = {
  getSummary,
  getTableValidations,
  removeValidations,
  setNodeValueValidations,
}
