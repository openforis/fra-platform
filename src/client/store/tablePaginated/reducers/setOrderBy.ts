import { Draft, PayloadAction } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { TablePaginatedOrderBy } from 'meta/tablePaginated'

import { TablePaginatedState } from 'client/store/tablePaginated/state'

export const setOrderBy = (
  state: Draft<TablePaginatedState>,
  action: PayloadAction<{ orderBy: TablePaginatedOrderBy; path: string }>
) => {
  const { orderBy, path } = action.payload
  Objects.setInPath({ obj: state, path: [path, 'orderBy'], value: orderBy })
  Objects.setInPath({ obj: state, path: [path, 'page'], value: 0 })
}
