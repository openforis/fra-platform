import { createSlice } from '@reduxjs/toolkit'

import { removeValidationsReducer } from 'client/store/data/validations/tables/slice/extraReducers/removeValidationsReducer'
import { setNodeValueValidationsReducer } from 'client/store/data/validations/tables/slice/extraReducers/setNodeValueValidationsReducer'
import { initialState } from 'client/store/data/validations/tables/state'

import { TableValidationSliceName } from './name'

export const TableValidationSlice = createSlice({
  name: TableValidationSliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    removeValidationsReducer(builder)
    setNodeValueValidationsReducer(builder)
  },
})
