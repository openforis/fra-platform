import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { Objects } from 'utils/objects'

import { removeValidations } from 'client/store/data/validations/actions/removeValidations'
import { TableValidationState } from 'client/store/data/validations/tables/state'

export const removeValidationsReducer = (builder: ActionReducerMapBuilder<TableValidationState>): void => {
  builder.addCase(removeValidations, (state, action) => {
    const { assessmentName, countryIso, cycleName } = action.payload

    Objects.unset(state, [assessmentName, cycleName, countryIso])
  })
}
