import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { Objects } from 'utils/objects'

import { setValidationSummary } from 'client/store/data/validations/summary/actions/setValidationSummary'
import { SummaryValidationState } from 'client/store/data/validations/summary/state'

export const setValidationSummaryReducer = (builder: ActionReducerMapBuilder<SummaryValidationState>): void => {
  builder.addCase(setValidationSummary, (state, action) => {
    const { assessmentName, countryIso, cycleName, summary } = action.payload

    Objects.setInPath({ obj: state, path: [assessmentName, cycleName, countryIso], value: summary })
  })
}
