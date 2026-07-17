import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { Objects } from 'utils/objects'

import { removeValidations } from 'client/store/data/validations/actions/removeValidations'
import { DescriptionValidationState } from 'client/store/data/validations/descriptions/state'

export const removeValidationsReducer = (builder: ActionReducerMapBuilder<DescriptionValidationState>): void => {
  builder.addCase(removeValidations, (state, action) => {
    const { assessmentName, countryIso, cycleName } = action.payload

    Objects.unset(state, [assessmentName, cycleName, countryIso])
  })
}
