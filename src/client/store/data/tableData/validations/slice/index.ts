import { createSlice } from '@reduxjs/toolkit'

import { setValidationsReducer } from 'client/store/data/tableData/validations/slice/extraReducers/setValidationsReducer'
import { initialState } from 'client/store/data/tableData/validations/state'

export const ValidationsReducer = createSlice({
  name: 'validations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    setValidationsReducer(builder)
  },
})
