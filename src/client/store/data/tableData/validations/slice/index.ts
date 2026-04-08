import { createSlice } from '@reduxjs/toolkit'

import { getSummaryReducer } from 'client/store/data/tableData/validations/slice/extraReducers/getSummaryReducer'
import { setValidationsReducer } from 'client/store/data/tableData/validations/slice/extraReducers/setValidationsReducer'
import { initialState } from 'client/store/data/tableData/validations/state'

import { ValidationsReducerName } from './name'

export const ValidationsReducer = createSlice({
  name: ValidationsReducerName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    getSummaryReducer(builder)
    setValidationsReducer(builder)
  },
})
