import { createSlice, Reducer } from '@reduxjs/toolkit'

import { HomeCountriesFilterActions } from '@webapp/store/page/home/actionTypes'
import { AppActions } from '@webapp/store/app'
import { HomeState } from './HomeStateType'

const initialState: HomeState = {}

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    updateCountriesFilter: (_state: HomeState, action: HomeCountriesFilterActions): HomeState => {
      return {
        countriesFilter: action.payload,
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(AppActions.updateCountryIso, () => initialState)
  },
})

export const HomeActions = {
  ...homeSlice.actions,
}

export default homeSlice.reducer as Reducer<HomeState>
