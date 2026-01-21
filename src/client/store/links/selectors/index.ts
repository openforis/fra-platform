import { createSelector } from '@reduxjs/toolkit'

import { LinksSlice } from 'client/store/links/slice'
import { LinksState } from 'client/store/links/state'
import { RootState } from 'client/store/types'

const _getState = (state: RootState): LinksState | undefined => state[LinksSlice.name]
const isVerificationInProgress = createSelector(_getState, (links) => links?.isVerificationInProgress)

export const LinksSelectors = {
  isVerificationInProgress,
}
