import { createSlice } from '@reduxjs/toolkit'

import { getReducer } from 'client/store/data/validations/summary/slice/extraReducers/getReducer'
import { removeValidationsReducer } from 'client/store/data/validations/summary/slice/extraReducers/removeValidationsReducer'
import { setReducer } from 'client/store/data/validations/summary/slice/extraReducers/setReducer'
import { initialState } from 'client/store/data/validations/summary/state'

import { SummaryValidationSliceName } from './name'

export const SummaryValidationSlice = createSlice({
  name: SummaryValidationSliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    getReducer(builder)
    removeValidationsReducer(builder)
    setReducer(builder)
  },
})
