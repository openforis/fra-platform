import { createSlice } from '@reduxjs/toolkit'

import { deleteNationalDataPointValidationReducer } from 'client/store/data/validations/nationalDataPoints/slice/extraReducers/deleteNationalDataPointValidationReducer'
import { removeValidationsReducer } from 'client/store/data/validations/nationalDataPoints/slice/extraReducers/removeValidationsReducer'
import { setNationalDataPointValidationsReducer } from 'client/store/data/validations/nationalDataPoints/slice/extraReducers/setNationalDataPointValidationsReducer'
import { updateNationalDataPointValidationsReducer } from 'client/store/data/validations/nationalDataPoints/slice/extraReducers/updateNationalDataPointValidationsReducer'
import { initialState } from 'client/store/data/validations/nationalDataPoints/state'

import { NationalDataPointValidationSliceName } from './name'

export const NationalDataPointValidationSlice = createSlice({
  name: NationalDataPointValidationSliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    deleteNationalDataPointValidationReducer(builder)
    removeValidationsReducer(builder)
    setNationalDataPointValidationsReducer(builder)
    updateNationalDataPointValidationsReducer(builder)
  },
})
