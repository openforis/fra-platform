import { deleteNationalDataPointValidation } from 'client/store/data/validations/actions/deleteNationalDataPointValidation'
import { getDescriptionValidations } from 'client/store/data/validations/actions/getDescriptionValidations'
import { getNationalDataPointValidations } from 'client/store/data/validations/actions/getNationalDataPointValidations'
import { getSummary } from 'client/store/data/validations/actions/getSummary'
import { getTableValidations } from 'client/store/data/validations/actions/getTableValidations'
import { removeValidations } from 'client/store/data/validations/actions/removeValidations'
import { setDescriptionValidations } from 'client/store/data/validations/actions/setDescriptionValidations'
import { setNationalDataPointValidations } from 'client/store/data/validations/actions/setNationalDataPointValidations'
import { setNodeValueValidations } from 'client/store/data/validations/actions/setNodeValueValidations'
import { updateNationalDataPointValidations } from 'client/store/data/validations/actions/updateNationalDataPointValidations'

export const ValidationsActions = {
  deleteNationalDataPointValidation,
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
