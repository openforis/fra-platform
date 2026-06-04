import { createSlice } from '@reduxjs/toolkit'

import getCountReducer from 'client/store/tablePaginated/slice/extraReducers/getCountReducer'
import getDataFulfilledReducer from 'client/store/tablePaginated/slice/extraReducers/getDataFulfilledReducer'
import getDataPendingReducer from 'client/store/tablePaginated/slice/extraReducers/getDataPendingReducer'
import { init } from 'client/store/tablePaginated/slice/reducers/init'
import { resetData } from 'client/store/tablePaginated/slice/reducers/resetData'
import { resetFilter } from 'client/store/tablePaginated/slice/reducers/resetFilter'
import { resetFilters } from 'client/store/tablePaginated/slice/reducers/resetFilters'
import { resetPaths } from 'client/store/tablePaginated/slice/reducers/resetPaths'
import { setFilterValue } from 'client/store/tablePaginated/slice/reducers/setFilterValue'
import { setOrderBy } from 'client/store/tablePaginated/slice/reducers/setOrderBy'
import { setPage } from 'client/store/tablePaginated/slice/reducers/setPage'
import { initialState } from 'client/store/tablePaginated/state'

import { TablePaginatedSliceName } from './name'

export const TablePaginatedSlice = createSlice({
  name: TablePaginatedSliceName,
  initialState,
  reducers: {
    init,
    setFilterValue,
    setOrderBy,
    setPage,
    resetData,
    resetFilter,
    resetFilters,
    resetPaths,
  },
  extraReducers: (builder) => {
    getCountReducer(builder)
    getDataPendingReducer(builder)
    getDataFulfilledReducer(builder)
  },
})
