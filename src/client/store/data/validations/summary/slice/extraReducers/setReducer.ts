import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { Objects } from 'utils/objects'

import { set } from 'client/store/data/validations/summary/actions/set'
import { SummaryValidationState } from 'client/store/data/validations/summary/state'

export const setReducer = (builder: ActionReducerMapBuilder<SummaryValidationState>): void => {
  builder.addCase(set, (state, action) => {
    const { assessmentName, countryIso, cycleName, summary } = action.payload

    Objects.setInPath({ obj: state, path: [assessmentName, cycleName, countryIso], value: summary })
  })
}
