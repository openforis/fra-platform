import { createSelector } from '@reduxjs/toolkit'

import { LinksSlice } from 'client/store/admin/links/slice'
import { AdminSliceName } from 'client/store/admin/slice'
import { RootState } from 'client/store/types'

const _getState = (state: RootState) => state[AdminSliceName][LinksSlice.name]
const isVerificationInProgress = createSelector(_getState, (links) => links.isVerificationInProgress)

export const LinksSelectors = {
  isVerificationInProgress,
}
