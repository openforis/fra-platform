import { createSlice } from '@reduxjs/toolkit'

import { setValidationsReducer } from 'client/store/data/tableData/validations/slice/extraReducers/setValidationsReducer'
import { initialState } from 'client/store/data/tableData/validations/state'

import { ValidationsReducerName } from './name'

export const ValidationsReducer = createSlice({
  name: ValidationsReducerName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    setValidationsReducer(builder)
  },
})
