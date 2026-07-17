import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { Objects } from 'utils/objects'

import { getSummary } from 'client/store/data/validations/summary/actions/getSummary'
import { SummaryValidationState } from 'client/store/data/validations/summary/state'

export const getSummaryReducer = (builder: ActionReducerMapBuilder<SummaryValidationState>): void => {
  builder.addCase(getSummary.fulfilled, (state, action) => {
    const { meta, payload } = action
    const { assessmentName, countryIso, cycleName } = meta.arg

    Objects.setInPath({
      obj: state,
      path: [assessmentName, cycleName, countryIso],
      value: payload,
    })
  })
}
