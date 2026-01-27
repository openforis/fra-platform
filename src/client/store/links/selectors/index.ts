import { createSelector } from '@reduxjs/toolkit'

import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

import { LinksSlice } from 'client/store/links/slice'
import { LinksCountryKey, LinksState } from 'client/store/links/state'
import { RootState } from 'client/store/types'

const _getState = (state: RootState): LinksState | undefined => state[LinksSlice.name]

const _getVerificationData = createSelector(
  [
    _getState,
    (_state: RootState, assessmentName: AssessmentName) => assessmentName,
    (_state: RootState, _assessmentName: AssessmentName, cycleName: CycleName) => cycleName,
    (_state: RootState, _assessmentName: AssessmentName, _cycleName: CycleName, countryKey: LinksCountryKey) =>
      countryKey,
  ],
  (state, assessmentName, cycleName, countryKey) => state?.[assessmentName]?.[cycleName]?.[countryKey]
)

const getIsVerificationInProgress = createSelector([_getVerificationData], (data) => data?.isVerificationInProgress)

const getVerificationSummary = createSelector([_getVerificationData], (data) => data?.verificationSummary?.summary)

const getVerificationSummaryStatus = createSelector([_getVerificationData], (data) => data?.verificationSummary?.status)

export const LinksSelectors = {
  getIsVerificationInProgress,
  getVerificationSummary,
  getVerificationSummaryStatus,
}
