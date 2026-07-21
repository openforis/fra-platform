import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { Objects } from 'utils/objects'

import { setValidations } from 'client/store/data/validations/nationalDataPoints/actions/setValidations'
import { NationalDataPointValidationState } from 'client/store/data/validations/nationalDataPoints/state'

export const setValidationsReducer = (builder: ActionReducerMapBuilder<NationalDataPointValidationState>): void => {
  builder.addCase(setValidations, (state, action) => {
    const { assessmentName, countryIso, cycleName, validations } = action.payload

    const path = [assessmentName, cycleName, countryIso]
    Objects.setInPath({ obj: state, path, value: validations })
  })
}
