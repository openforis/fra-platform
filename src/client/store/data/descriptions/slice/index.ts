import { createSlice } from '@reduxjs/toolkit'

import { deleteDataSourceReducer } from 'client/store/data/descriptions/slice/extraReducers/deleteDataSourceReducer'
import { getDescriptionReducer } from 'client/store/data/descriptions/slice/extraReducers/getDescriptionReducer'
import { updateDescriptionReducer } from 'client/store/data/descriptions/slice/extraReducers/updateDescriptionReducer'
import { initialState } from 'client/store/data/descriptions/state'

export const DescriptionsSlice = createSlice({
  name: 'descriptions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    getDescriptionReducer(builder)
    updateDescriptionReducer(builder)
    deleteDataSourceReducer(builder)
  },
})
