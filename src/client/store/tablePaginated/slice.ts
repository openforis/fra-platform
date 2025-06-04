import { createSlice } from '@reduxjs/toolkit'

import getCountReducer from './extraReducers/getCountReducer'
import getDataFulfilledReducer from './extraReducers/getDataFulfilledReducer'
import getDataPendingReducer from './extraReducers/getDataPendingReducer'
import { init } from './reducers/init'
import { resetData } from './reducers/resetData'
import { resetFilter } from './reducers/resetFilter'
import { resetPaths } from './reducers/resetPaths'
import { setFilterValue } from './reducers/setFilterValue'
import { setOrderBy } from './reducers/setOrderBy'
import { setPage } from './reducers/setPage'
import { initialState } from './state'

export const TablePaginatedSlice = createSlice({
  name: 'tablePaginated',
  initialState,
  reducers: {
    init,
    setFilterValue,
    setOrderBy,
    setPage,
    resetData,
    resetFilter,
    resetPaths,
  },
  extraReducers: (builder) => {
    getCountReducer(builder)
    getDataPendingReducer(builder)
    getDataFulfilledReducer(builder)
  },
})
