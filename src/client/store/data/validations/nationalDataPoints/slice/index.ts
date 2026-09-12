import { createSlice } from '@reduxjs/toolkit'

import { deleteValidationReducer } from 'client/store/data/validations/nationalDataPoints/slice/extraReducers/deleteValidationReducer'
import { removeValidationsReducer } from 'client/store/data/validations/nationalDataPoints/slice/extraReducers/removeValidationsReducer'
import { setValidationsReducer } from 'client/store/data/validations/nationalDataPoints/slice/extraReducers/setValidationsReducer'
import { updateValidationsReducer } from 'client/store/data/validations/nationalDataPoints/slice/extraReducers/updateValidationsReducer'
import { initialState } from 'client/store/data/validations/nationalDataPoints/state'

import { NationalDataPointValidationSliceName } from './name'

export const NationalDataPointValidationSlice = createSlice({
  name: NationalDataPointValidationSliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    deleteValidationReducer(builder)
    removeValidationsReducer(builder)
    setValidationsReducer(builder)
    updateValidationsReducer(builder)
  },
})
