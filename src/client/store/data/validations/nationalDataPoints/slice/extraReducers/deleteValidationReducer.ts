import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { Objects } from 'utils/objects'

import { deleteValidation } from 'client/store/data/validations/nationalDataPoints/actions/deleteValidation'
import { NationalDataPointValidationState } from 'client/store/data/validations/nationalDataPoints/state'

export const deleteValidationReducer = (builder: ActionReducerMapBuilder<NationalDataPointValidationState>): void => {
  builder.addCase(deleteValidation, (state, action) => {
    const { assessmentName, countryIso, cycleName, uuid } = action.payload
    const path = [assessmentName, cycleName, countryIso]
    const nationalDataPointValidations = Objects.getInPath(state, path)

    if (Objects.isNil(nationalDataPointValidations)) return

    delete nationalDataPointValidations[uuid]
  })
}
