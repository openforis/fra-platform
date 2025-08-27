import { createSlice } from '@reduxjs/toolkit'

import { nodeValuesReducer } from 'client/store/data/tableData/nodeValues/slice/extraReducers/nodeValuesReducer'
import { tableDataReducer } from 'client/store/data/tableData/nodeValues/slice/extraReducers/tableDataReducer'
import { removeOriginalDataPointReducer } from 'client/store/data/tableData/nodeValues/slice/reducers/removeOriginalDataPointReducer'
import { initialState } from 'client/store/data/tableData/nodeValues/state'

import { NodeValuesSliceName } from './name'

export const NodeValuesSlice = createSlice({
  name: NodeValuesSliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    nodeValuesReducer(builder)
    removeOriginalDataPointReducer(builder)
    tableDataReducer(builder)
  },
})
