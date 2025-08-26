import { Draft, PayloadAction } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { TablePaginatedFilterType } from 'meta/tablePaginated'

import { TablePaginatedState } from 'client/store/tablePaginated/state'
import { TablePaginatedFilter } from 'client/components/TablePaginated/types'

export const init = (
  state: Draft<TablePaginatedState>,
  action: PayloadAction<{ path: string; filters: Array<TablePaginatedFilter<TablePaginatedFilterType>> }>
): void => {
  const { filters, path } = action.payload
  filters.forEach((filter) => {
    const { defaultValue, fieldName } = filter
    if (defaultValue === undefined) return
    Objects.setInPath({ obj: state, path: [path, 'filters', fieldName], value: defaultValue })
  })
  Objects.setInPath({ obj: state, path: [path, 'initialized'], value: true })
  Objects.setInPath({ obj: state, path: [path, 'page'], value: 0 })
}
