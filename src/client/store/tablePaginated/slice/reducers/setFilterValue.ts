import { Draft, PayloadAction } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { TablePaginatedFilterValues } from 'meta/tablePaginated'

import { TablePaginatedState } from 'client/store/tablePaginated/state'

export const setFilterValue = (
  state: Draft<TablePaginatedState>,
  action: PayloadAction<{ fieldName: string; path: string; value: TablePaginatedFilterValues }>
): void => {
  const { fieldName, path, value } = action.payload
  Objects.setInPath({ obj: state, path: [path, 'filters', fieldName], value })
  Objects.setInPath({ obj: state, path: [path, 'page'], value: 0 })
}
