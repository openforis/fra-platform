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
import { updateNationalClass } from 'meta/assessment/odps/updateNationalClass'
import { validateNationalClass, validateYear } from 'meta/assessment/odps/validateODP'

export const ODPs = {
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
  shouldUseTotalPrimaryForestPercentage,
  updateNationalClass,
  // Validate
  validateYear,
  validateNationalClass,
}
