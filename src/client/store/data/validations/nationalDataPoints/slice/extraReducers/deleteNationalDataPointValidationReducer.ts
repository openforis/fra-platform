import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { Objects } from 'utils/objects'

import { deleteNationalDataPointValidation } from 'client/store/data/validations/nationalDataPoints/actions/deleteNationalDataPointValidation'
import { NationalDataPointValidationState } from 'client/store/data/validations/nationalDataPoints/state'

export const deleteNationalDataPointValidationReducer = (
  builder: ActionReducerMapBuilder<NationalDataPointValidationState>
): void => {
  builder.addCase(deleteNationalDataPointValidation, (state, action) => {
    const { assessmentName, countryIso, cycleName, uuid } = action.payload
    const path = [assessmentName, cycleName, countryIso]
    const nationalDataPointValidations = Objects.getInPath(state, path)

    if (Objects.isNil(nationalDataPointValidations)) return

    delete nationalDataPointValidations[uuid]
  })
}
