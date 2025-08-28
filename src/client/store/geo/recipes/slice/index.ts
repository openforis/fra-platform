import { createSlice } from '@reduxjs/toolkit'

import { setSectionRecipeReducer } from 'client/store/geo/recipes/slice/extraReducers/setSectionRecipeReducer'
import { initialState } from 'client/store/geo/recipes/state'

import { GeoRecipesSliceName } from './name'

export const GeoRecipesSlice = createSlice({
  initialState,
  name: GeoRecipesSliceName,
  reducers: {},
  extraReducers: (builder) => {
    setSectionRecipeReducer(builder)
  },
})
