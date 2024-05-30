import { createSelector } from '@reduxjs/toolkit'

import { RootState } from 'client/store/RootState'
import { LinksSlice } from 'client/store/ui/links/slice'

const _getState = (state: RootState) => state.ui[LinksSlice.name]
const isVerificationInProgress = createSelector(_getState, (links) => links.isVerificationInProgress)

export const LinksSelectors = {
  isVerificationInProgress,
}
