import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { Objects } from 'utils/objects'

import { get } from 'client/store/data/validations/summary/actions/get'
import { SummaryValidationState } from 'client/store/data/validations/summary/state'

export const getReducer = (builder: ActionReducerMapBuilder<SummaryValidationState>): void => {
  builder.addCase(get.fulfilled, (state, action) => {
    const { meta, payload } = action
    const { assessmentName, countryIso, cycleName } = meta.arg

    Objects.setInPath({
      obj: state,
      path: [assessmentName, cycleName, countryIso],
      value: payload,
    })
  })
}
