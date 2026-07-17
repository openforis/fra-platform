import { createSlice } from '@reduxjs/toolkit'

import { getSummaryReducer } from 'client/store/data/validations/summary/slice/extraReducers/getSummaryReducer'
import { removeValidationsReducer } from 'client/store/data/validations/summary/slice/extraReducers/removeValidationsReducer'
import { setValidationSummaryReducer } from 'client/store/data/validations/summary/slice/extraReducers/setValidationSummaryReducer'
import { initialState } from 'client/store/data/validations/summary/state'

import { SummaryValidationSliceName } from './name'

export const SummaryValidationSlice = createSlice({
  name: SummaryValidationSliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    getSummaryReducer(builder)
    removeValidationsReducer(builder)
    setValidationSummaryReducer(builder)
  },
})
