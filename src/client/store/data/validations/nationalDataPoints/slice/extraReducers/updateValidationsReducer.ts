import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { Objects } from 'utils/objects'

import { updateValidations } from 'client/store/data/validations/nationalDataPoints/actions/updateValidations'
import { NationalDataPointValidationState } from 'client/store/data/validations/nationalDataPoints/state'

export const updateValidationsReducer = (builder: ActionReducerMapBuilder<NationalDataPointValidationState>): void => {
  builder.addCase(updateValidations, (state, action) => {
    const { assessmentName, countryIso, cycleName, validations } = action.payload

    const path = [assessmentName, cycleName, countryIso]
    const oldValue = Objects.getInPath(state, path)

    const value = { ...oldValue, ...validations }
    Objects.setInPath({ obj: state, path, value })
  })
}
