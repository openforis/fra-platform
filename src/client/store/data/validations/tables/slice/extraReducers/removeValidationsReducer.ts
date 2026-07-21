import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { Objects } from 'utils/objects'

import { ValidationActions } from 'client/store/data/validations/actions'
import { TableValidationState } from 'client/store/data/validations/tables/state'

export const removeValidationsReducer = (builder: ActionReducerMapBuilder<TableValidationState>): void => {
  builder.addCase(ValidationActions.removeValidations, (state, action) => {
    const { assessmentName, countryIso, cycleName } = action.payload

    Objects.unset(state, [assessmentName, cycleName, countryIso])
  })
}
