import { addNationalClassPlaceHolder } from '@core/odp/odps/addNationalClassPlaceHolder'
import {
  calcTotalArea,
  calcTotalFieldArea,
  calcTotalLandArea,
  calcTotalSubFieldArea,
  calcTotalSubSubFieldArea,
} from '@core/odp/odps/calc'
import { canCopyPreviousValues } from '@core/odp/odps/canCopyPreviousValues'
import { deleteNationalClass } from '@core/odp/odps/deleteNationalClass'
import { updateNationalClass } from '@core/odp/odps/updateNationalClass'

export const ODPs = {
  addNationalClassPlaceHolder,
  calcTotalArea,
  calcTotalFieldArea,
  calcTotalLandArea,
  calcTotalSubFieldArea,
  calcTotalSubSubFieldArea,
  canCopyPreviousValues,
  deleteNationalClass,
  updateNationalClass,
}
