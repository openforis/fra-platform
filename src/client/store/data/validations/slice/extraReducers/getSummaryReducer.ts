import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { Objects } from 'utils/objects'

import { getSummary } from 'client/store/data/validations/actions/getSummary'
import { ValidationsState } from 'client/store/data/validations/state'

export const getSummaryReducer = (builder: ActionReducerMapBuilder<ValidationsState>): void => {
  builder.addCase(getSummary.fulfilled, (state, action) => {
    const { meta, payload } = action
    const { assessmentName, countryIso, cycleName } = meta.arg

    Objects.setInPath({
      obj: state.summary,
      path: [assessmentName, cycleName, countryIso],
      value: payload,
    })
  })
}
