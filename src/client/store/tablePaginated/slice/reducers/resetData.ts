import { Draft, PayloadAction } from '@reduxjs/toolkit'

import { Objects } from 'utils/objects'

import { TablePaginatedState } from 'client/store/tablePaginated/state'

export const resetData = (
  state: Draft<TablePaginatedState>,
  action: PayloadAction<{ path: string; resetCount?: boolean }>
): void => {
  const { path, resetCount = true } = action.payload
  Objects.unset(state, [path, 'data'])
  if (resetCount) Objects.unset(state, [path, 'count'])
}
