import { addNationalClassPlaceHolder } from 'meta/assessment/odps/addNationalClassPlaceHolder'
import {
  calcTotalArea,
  calcTotalFieldArea,
  calcTotalLandArea,
  calcTotalSubFieldArea,
  calcTotalSubSubFieldArea,
  calculateValues,
  shouldUseTotalPrimaryForestPercentage,
} from 'meta/assessment/odps/calc'
import { canCopyPreviousValues } from 'meta/assessment/odps/canCopyPreviousValues'
import { deleteNationalClass } from 'meta/assessment/odps/deleteNationalClass'
import {
  calculateNationalClassForestArea,
  calculateNationalClassNaturalForestPercentArea,
  calculateNationalClassOtherLandPercent,
  calculateNationalClassPlantationForestPercentArea,
  hasNaturallyRegenerating,
} from 'meta/assessment/odps/nationalClassUtils'
import { removeNationalClassPlaceHolder } from 'meta/assessment/odps/removeNationalClassPlaceHolder'
import { updateNationalClass } from 'meta/assessment/odps/updateNationalClass'

export const ODPs = {
  addNationalClassPlaceHolder,
  calcTotalArea,
  calcTotalFieldArea,
  calcTotalLandArea,
  calcTotalSubFieldArea,
  calcTotalSubSubFieldArea,
  calculateNationalClassForestArea,
  calculateNationalClassNaturalForestPercentArea,
  calculateNationalClassOtherLandPercent,
  calculateNationalClassPlantationForestPercentArea,
  calculateValues,
  canCopyPreviousValues,
  deleteNationalClass,
  hasNaturallyRegenerating,
  removeNationalClassPlaceHolder,
  shouldUseTotalPrimaryForestPercentage,
  updateNationalClass,
}
