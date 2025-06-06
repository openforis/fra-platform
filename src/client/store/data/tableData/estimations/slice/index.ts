import { createSlice } from '@reduxjs/toolkit'

import { getEstimationsReducer } from 'client/store/data/tableData/estimations/slice/extraReducers/getEstimationsReducer'
import { postEstimationsReducer } from 'client/store/data/tableData/estimations/slice/extraReducers/postEstimationsReducer'
import { initialState } from 'client/store/data/tableData/estimations/state'

export const EstimationsSlice = createSlice({
  name: 'estimations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    getEstimationsReducer(builder)
    postEstimationsReducer(builder)
  },
})
