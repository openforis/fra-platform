import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { Objects } from 'utils/objects'

import { getIsVerificationInProgress } from 'client/store/links/actions/getIsVerificationInProgress'
import { getLinksVerificationKey, LinksState } from 'client/store/links/state'

export const getIsVerificationInProgressReducer = (builder: ActionReducerMapBuilder<LinksState>): void => {
  builder.addCase(getIsVerificationInProgress.fulfilled, (state, { meta, payload }) => {
    const { assessmentName, countryIso, cycleName } = meta.arg
    const countryKey = getLinksVerificationKey(countryIso)
    Objects.setInPath({
      obj: state,
      path: ['isVerificationInProgress', assessmentName, cycleName, countryKey],
      value: payload,
    })
  })
}
