import { addNationalClassPlaceHolder } from './addNationalClassPlaceHolder'
import {
  calcTotalArea,
  calcTotalFieldArea,
  calcTotalLandArea,
  calcTotalSubFieldArea,
  calcTotalSubSubFieldArea,
  calculateValues,
  shouldUseTotalPrimaryForestPercentage,
} from './calc'
import { canCopyPreviousValues } from './canCopyPreviousValues'
import { deleteNationalClass } from './deleteNationalClass'
import { hasNaturallyRegenerating } from './nationalClassUtils'
import { removeNationalClassPlaceHolder } from './removeNationalClassPlaceHolder'
import { updateNationalClass } from './updateNationalClass'
import { validateNationalClass, validateYear } from './validateODP'

export const ODPs = {
  addNationalClassPlaceHolder,
  calcTotalArea,
  calcTotalFieldArea,
  calcTotalLandArea,
  calcTotalSubFieldArea,
  calcTotalSubSubFieldArea,
  calculateValues,
  canCopyPreviousValues,
  deleteNationalClass,
  hasNaturallyRegenerating,
  removeNationalClassPlaceHolder,
  shouldUseTotalPrimaryForestPercentage,
  updateNationalClass,
  // Validate
  validateYear,
  validateNationalClass,
}
