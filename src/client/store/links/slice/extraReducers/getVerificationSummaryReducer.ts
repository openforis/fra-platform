import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { Objects } from 'utils/objects'

import { getVerificationSummary } from 'client/store/links/actions/getVerificationSummary'
import { getLinksVerificationKey, LinksState } from 'client/store/links/state'

export const getVerificationSummaryReducer = (builder: ActionReducerMapBuilder<LinksState>): void => {
  builder.addCase(getVerificationSummary.fulfilled, (state, { meta, payload }) => {
    const { assessmentName, countryIso, cycleName } = meta.arg
    const countryKey = getLinksVerificationKey(countryIso)
    Objects.setInPath({
      obj: state,
      path: ['verificationSummary', assessmentName, cycleName, countryKey],
      value: payload,
    })
  })
}
