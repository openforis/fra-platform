import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { Objects } from 'utils/objects'

import { updateNationalDataPointValidations } from 'client/store/data/tableData/validations/actions/updateNationalDataPointValidations'
import { ValidationsState } from 'client/store/data/tableData/validations/state'

export const updateNationalDataPointValidationsReducer = (builder: ActionReducerMapBuilder<ValidationsState>): void => {
  builder.addCase(updateNationalDataPointValidations, (state, action) => {
    const { assessmentName, countryIso, cycleName, validations } = action.payload

    const path = [assessmentName, cycleName, countryIso]
    const oldValue = Objects.getInPath(state.nationalDataPoints, path)

    const value = { ...oldValue, ...validations }
    Objects.setInPath({ obj: state.nationalDataPoints, path, value })
  })
}
