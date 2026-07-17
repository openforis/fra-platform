import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { Objects } from 'utils/objects'

import { setNationalDataPointValidations } from 'client/store/data/validations/nationalDataPoints/actions/setNationalDataPointValidations'
import { NationalDataPointValidationState } from 'client/store/data/validations/nationalDataPoints/state'

export const setNationalDataPointValidationsReducer = (
  builder: ActionReducerMapBuilder<NationalDataPointValidationState>
): void => {
  builder.addCase(setNationalDataPointValidations, (state, action) => {
    const { assessmentName, countryIso, cycleName, validations } = action.payload

    const path = [assessmentName, cycleName, countryIso]
    Objects.setInPath({ obj: state, path, value: validations })
  })
}
