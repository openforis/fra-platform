import { addNationalClassPlaceHolder } from './addNationalClassPlaceHolder'
import {
  calcPrimaryForestPercent,
  calcTotalArea,
  calcTotalFieldArea,
  calcTotalLandArea,
  calcTotalSubFieldArea,
  calcTotalSubSubFieldArea,
  calculateValues,
} from './calc'
import { canCopyPreviousValues } from './canCopyPreviousValues'
import { deleteNationalClass } from './deleteNationalClass'
import { removeNationalClassPlaceHolder } from './removeNationalClassPlaceHolder'
import { updateNationalClass } from './updateNationalClass'
import { validateNationalClass, validateYear } from './validateODP'

export const ODPs = {
  addNationalClassPlaceHolder,
  calcPrimaryForestPercent,
  calcTotalArea,
  calcTotalFieldArea,
  calcTotalLandArea,
  calcTotalSubFieldArea,
  calcTotalSubSubFieldArea,
  calculateValues,
  canCopyPreviousValues,
  deleteNationalClass,
  removeNationalClassPlaceHolder,
  updateNationalClass,
  // Validate
  validateYear,
  validateNationalClass,
}
