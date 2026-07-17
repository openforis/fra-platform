import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { Objects } from 'utils/objects'

import { removeValidations } from 'client/store/data/validations/actions/removeValidations'
import { SummaryValidationState } from 'client/store/data/validations/summary/state'

export const removeValidationsReducer = (builder: ActionReducerMapBuilder<SummaryValidationState>): void => {
  builder.addCase(removeValidations, (state, action) => {
    const { assessmentName, countryIso, cycleName } = action.payload

    Objects.unset(state, [assessmentName, cycleName, countryIso])
  })
}
