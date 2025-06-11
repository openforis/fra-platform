import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit'

import { getTableDataReducer } from 'client/store/data/tableData/status/slice/extraReducers/getTableDataReducer'
import { TableDataStatusState } from 'client/store/data/tableData/status/state'

export const TableDataStatusSlice = createSlice({
  name: 'tableDataStatus',
  initialState: {},
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<TableDataStatusState>) => {
    getTableDataReducer(builder)
  },
})
