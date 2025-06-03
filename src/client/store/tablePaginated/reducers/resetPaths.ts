import { Draft, PayloadAction } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { TablePaginatedState } from 'client/store/tablePaginated/state'

export const resetPaths = (state: Draft<TablePaginatedState>, action: PayloadAction<{ paths: Array<string> }>) => {
  const { paths } = action.payload
  paths.forEach((path) => {
    Objects.unset(state, [path])
  })
}
