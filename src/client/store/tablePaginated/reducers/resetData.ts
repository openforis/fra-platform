import { Draft, PayloadAction } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { TablePaginatedState } from 'client/store/tablePaginated/state'

export const resetData = (state: Draft<TablePaginatedState>, action: PayloadAction<{ path: string }>) => {
  const { path } = action.payload
  Objects.unset(state, [path, 'data'])
}
