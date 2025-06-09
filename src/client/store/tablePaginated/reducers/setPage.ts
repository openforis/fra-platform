import { Draft, PayloadAction } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { TablePaginatedState } from 'client/store/tablePaginated/state'

export const setPage = (state: Draft<TablePaginatedState>, action: PayloadAction<{ page: number; path: string }>) => {
  const { page, path } = action.payload
  Objects.setInPath({ obj: state, path: [path, 'page'], value: page })
}
