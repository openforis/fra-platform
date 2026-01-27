import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { Objects } from 'utils/objects'

import { setIsVerificationInProgress } from 'client/store/links/actions/setIsVerificationInProgress'
import { getLinksVerificationKey, LinksState } from 'client/store/links/state'

export const setIsVerificationInProgressReducer = (builder: ActionReducerMapBuilder<LinksState>): void => {
  builder.addCase(setIsVerificationInProgress, (state, action) => {
    const { assessmentName, countryIso, cycleName, isVerificationInProgress } = action.payload
    const countryKey = getLinksVerificationKey(countryIso)
    Objects.setInPath({
      obj: state,
      path: [assessmentName, cycleName, countryKey, 'isVerificationInProgress'],
      value: isVerificationInProgress,
    })
  })
}
