import { createSlice } from '@reduxjs/toolkit'

import { removeValidationsReducer } from 'client/store/data/validations/descriptions/slice/extraReducers/removeValidationsReducer'
import { setDescriptionValidationsReducer } from 'client/store/data/validations/descriptions/slice/extraReducers/setDescriptionValidationsReducer'
import { initialState } from 'client/store/data/validations/descriptions/state'

import { DescriptionValidationSliceName } from './name'

export const DescriptionValidationSlice = createSlice({
  name: DescriptionValidationSliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    removeValidationsReducer(builder)
    setDescriptionValidationsReducer(builder)
  },
})
