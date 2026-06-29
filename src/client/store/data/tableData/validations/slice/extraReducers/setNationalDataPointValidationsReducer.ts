import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { Objects } from 'utils/objects'

import { setNationalDataPointValidations } from 'client/store/data/tableData/validations/actions/setNationalDataPointValidations'
import { ValidationsState } from 'client/store/data/tableData/validations/state'

export const setNationalDataPointValidationsReducer = (builder: ActionReducerMapBuilder<ValidationsState>): void => {
  builder.addCase(setNationalDataPointValidations, (state, action) => {
    const { assessmentName, countryIso, cycleName, validations } = action.payload

    const path = [assessmentName, cycleName, countryIso]
    Objects.setInPath({ obj: state.nationalDataPoints, path, value: validations })
  })
}
