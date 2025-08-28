import { createSelector } from '@reduxjs/toolkit'

import { LinksSlice } from 'client/store/admin/links/slice'
import { LinksState } from 'client/store/admin/links/state'
import { AdminSliceName } from 'client/store/admin/name'
import { RootState } from 'client/store/types'

const _getState = (state: RootState): LinksState => state[AdminSliceName][LinksSlice.name]
const isVerificationInProgress = createSelector(_getState, (links) => links.isVerificationInProgress)

export const LinksSelectors = {
  isVerificationInProgress,
}
