import { createSelector } from '@reduxjs/toolkit'

import { RootState } from 'client/store/RootState'
import { TablePaginatedState } from 'client/store/ui/tablePaginated/state'

const _getState = createSelector(
  (state: RootState) => state.ui.tablePaginated,
  (tablePaginated: TablePaginatedState) => tablePaginated
)

const getCount = createSelector([_getState, (_state, path: string) => path], (state, path) => state?.[path]?.count)

const getData = createSelector([_getState, (_state, path: string) => path], (state, path) => state?.[path]?.data)

const getOrderBy = createSelector([_getState, (_state, path: string) => path], (state, path) => state?.[path]?.orderBy)

const getPage = createSelector([_getState, (_state, path: string) => path], (state, path) => state?.[path]?.page ?? 0)

export const TablePaginatedSelectors = {
  getCount,
  getData,
  getOrderBy,
  getPage,
}
