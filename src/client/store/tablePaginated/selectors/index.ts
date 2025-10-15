import { createSelector } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { TablePaginatedState } from 'client/store/tablePaginated/state'
import { RootState } from 'client/store/types'

const _getState = createSelector(
  (state: RootState) => state.tablePaginated,
  (tablePaginated: TablePaginatedState) => tablePaginated
)

const getPathState = createSelector(
  [_getState, (_state: RootState, path: string): string => path],
  (state, path) => state?.[path]
)

const getCount = createSelector([getPathState], (state) => state?.count)

const getData = createSelector([getPathState], (state) => state?.data)

const getFilters = createSelector([getPathState], (state) => state?.filters)

const getFilterValue = createSelector(
  [getFilters, (_state: RootState, _path: string, fieldName: string): string => fieldName],
  (filters, fieldName) => {
    if (Objects.isEmpty(filters)) return undefined
    return filters[fieldName]
  }
)

const getOrderBy = createSelector([getPathState], (state) => state?.orderBy)

const getPage = createSelector([getPathState], (state) => state?.page ?? 0)

const isInitialized = createSelector([getPathState], (state) => state?.initialized ?? false)

export const TablePaginatedSelectors = {
  getCount,
  getData,
  getFilters,
  getFilterValue,
  getOrderBy,
  getPage,
  getPathState,
  isInitialized,
}
