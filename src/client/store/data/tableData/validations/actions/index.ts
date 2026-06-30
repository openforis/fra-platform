import { getDescriptionValidations } from 'client/store/data/tableData/validations/actions/getDescriptionValidations'
import { getNationalDataPointValidations } from 'client/store/data/tableData/validations/actions/getNationalDataPointValidations'
import { getSummary } from 'client/store/data/tableData/validations/actions/getSummary'
import { getTableValidations } from 'client/store/data/tableData/validations/actions/getTableValidations'
import { removeValidations } from 'client/store/data/tableData/validations/actions/removeValidations'
import { setDescriptionValidations } from 'client/store/data/tableData/validations/actions/setDescriptionValidations'
import { setNationalDataPointValidations } from 'client/store/data/tableData/validations/actions/setNationalDataPointValidations'
import { setNodeValueValidations } from 'client/store/data/tableData/validations/actions/setNodeValueValidations'
import { updateNationalDataPointValidations } from 'client/store/data/tableData/validations/actions/updateNationalDataPointValidations'

export const ValidationsActions = {
  getDescriptionValidations,
  getNationalDataPointValidations,
  getSummary,
  getTableValidations,
  removeValidations,
  setDescriptionValidations,
  setNationalDataPointValidations,
  setNodeValueValidations,
  updateNationalDataPointValidations,
}
