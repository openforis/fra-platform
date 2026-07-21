import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { Objects } from 'utils/objects'

import { ValidationActions } from 'client/store/data/validations/actions'
import { SummaryValidationState } from 'client/store/data/validations/summary/state'

export const removeValidationsReducer = (builder: ActionReducerMapBuilder<SummaryValidationState>): void => {
  builder.addCase(ValidationActions.removeValidations, (state, action) => {
    const { assessmentName, countryIso, cycleName } = action.payload

    Objects.unset(state, [assessmentName, cycleName, countryIso])
  })
}
