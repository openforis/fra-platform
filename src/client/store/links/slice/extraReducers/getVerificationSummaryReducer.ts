import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { Objects } from 'utils/objects'

import { getVerificationSummary } from 'client/store/links/actions/getVerificationSummary'
import { getLinksVerificationKey, LinksState, LinksVerificationSummaryStatus } from 'client/store/links/state'

export const getVerificationSummaryReducer = (builder: ActionReducerMapBuilder<LinksState>): void => {
  builder.addCase(getVerificationSummary.pending, (state, { meta }) => {
    const { assessmentName, countryIso, cycleName } = meta.arg
    const countryKey = getLinksVerificationKey(countryIso)
    Objects.setInPath({
      obj: state,
      path: [assessmentName, cycleName, countryKey, 'verificationSummary', 'status'],
      value: LinksVerificationSummaryStatus.loading,
    })
  })

  builder.addCase(getVerificationSummary.fulfilled, (state, { meta, payload }) => {
    const { assessmentName, countryIso, cycleName } = meta.arg
    const countryKey = getLinksVerificationKey(countryIso)
    Objects.setInPath({
      obj: state,
      path: [assessmentName, cycleName, countryKey, 'verificationSummary', 'summary'],
      value: payload,
    })
    Objects.setInPath({
      obj: state,
      path: [assessmentName, cycleName, countryKey, 'verificationSummary', 'status'],
      value: LinksVerificationSummaryStatus.ready,
    })
  })

  builder.addCase(getVerificationSummary.rejected, (state, { meta }) => {
    const { assessmentName, countryIso, cycleName } = meta.arg
    const countryKey = getLinksVerificationKey(countryIso)
    Objects.setInPath({
      obj: state,
      path: [assessmentName, cycleName, countryKey, 'verificationSummary', 'status'],
      value: LinksVerificationSummaryStatus.failed,
    })
  })
}
