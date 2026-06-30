import { createSlice } from '@reduxjs/toolkit'

import { getSummaryReducer } from 'client/store/data/tableData/validations/slice/extraReducers/getSummaryReducer'
import { removeValidationsReducer } from 'client/store/data/tableData/validations/slice/extraReducers/removeValidationsReducer'
import { setDescriptionValidationsReducer } from 'client/store/data/tableData/validations/slice/extraReducers/setDescriptionValidationsReducer'
import { setNationalDataPointValidationsReducer } from 'client/store/data/tableData/validations/slice/extraReducers/setNationalDataPointValidationsReducer'
import { setValidationsReducer } from 'client/store/data/tableData/validations/slice/extraReducers/setValidationsReducer'
import { updateNationalDataPointValidationsReducer } from 'client/store/data/tableData/validations/slice/extraReducers/updateNationalDataPointValidationsReducer'
import { updateSummaryReducer } from 'client/store/data/tableData/validations/slice/extraReducers/updateSummaryReducer'
import { initialState } from 'client/store/data/tableData/validations/state'

import { ValidationsReducerName } from './name'

export const ValidationsReducer = createSlice({
  name: ValidationsReducerName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    getSummaryReducer(builder)
    removeValidationsReducer(builder)
    setDescriptionValidationsReducer(builder)
    setNationalDataPointValidationsReducer(builder)
    setValidationsReducer(builder)
    updateNationalDataPointValidationsReducer(builder)
    updateSummaryReducer(builder)
  },
})
