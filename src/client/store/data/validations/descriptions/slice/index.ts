import { createSlice } from '@reduxjs/toolkit'

import { removeValidationsReducer } from 'client/store/data/validations/descriptions/slice/extraReducers/removeValidationsReducer'
import { setValidationsReducer } from 'client/store/data/validations/descriptions/slice/extraReducers/setValidationsReducer'
import { initialState } from 'client/store/data/validations/descriptions/state'

import { DescriptionValidationSliceName } from './name'

export const DescriptionValidationSlice = createSlice({
  name: DescriptionValidationSliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    removeValidationsReducer(builder)
    setValidationsReducer(builder)
  },
})
