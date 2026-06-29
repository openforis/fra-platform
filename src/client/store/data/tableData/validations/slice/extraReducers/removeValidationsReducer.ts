import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { Objects } from 'utils/objects'

import { removeValidations } from 'client/store/data/tableData/validations/actions/removeValidations'
import { ValidationsState } from 'client/store/data/tableData/validations/state'

export const removeValidationsReducer = (builder: ActionReducerMapBuilder<ValidationsState>): void => {
  builder.addCase(removeValidations, (state, action) => {
    const { assessmentName, countryIso, cycleName } = action.payload
    const path = [assessmentName, cycleName, countryIso]

    Objects.unset(state.descriptions, path)
    Objects.unset(state.nationalDataPoints, path)
    Objects.unset(state.summary, path)
    Objects.unset(state.tables, path)
  })
}
