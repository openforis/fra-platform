import { Draft, PayloadAction } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { TablePaginatedState } from 'client/store/tablePaginated/state'

export const resetFilter = (
  state: Draft<TablePaginatedState>,
  action: PayloadAction<{ fieldName: string; path: string }>
): void => {
  const { fieldName, path } = action.payload
  Objects.unset(state, [path, 'filters', fieldName])
  Objects.setInPath({ obj: state, path: [path, 'page'], value: 0 })
}
