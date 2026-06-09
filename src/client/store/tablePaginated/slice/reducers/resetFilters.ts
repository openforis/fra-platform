import { Draft, PayloadAction } from '@reduxjs/toolkit'

import { Objects } from 'utils/objects'

import { TablePaginatedState } from 'client/store/tablePaginated/state'

export const resetFilters = (state: Draft<TablePaginatedState>, action: PayloadAction<{ path: string }>): void => {
  const { path } = action.payload
  Objects.unset(state, [path, 'filters'])
  Objects.setInPath({ obj: state, path: [path, 'page'], value: 0 })
}
