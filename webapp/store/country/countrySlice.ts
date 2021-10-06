/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit'

import { CountryConfig, CountryState } from './CountryStateType'
import { initCountry, fetchCountryStatus, changeAssessmentStatus } from './actions'

const initialState: CountryState = {
  config: null,
  status: null,
}

export const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    createCountryConfig: (state, action: PayloadAction<CountryConfig>) => {
      state.config = action.payload
    },
    updateCountryConfig: (state, { payload: { key, value } }: PayloadAction<{ key: string; value: boolean }>) => {
      state.config = { ...state.config, [key]: [value] }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initCountry.fulfilled, (state, { payload }) => {
        state.status = payload.status
        state.config = payload.config
      })
      .addCase(initCountry.rejected, () => initialState)

    builder
      .addCase(fetchCountryStatus.fulfilled, (state, { payload }) => {
        state.status = payload.status
      })
      .addCase(fetchCountryStatus.rejected, (state) => {
        state.status = null
      })

    builder.addCase(changeAssessmentStatus.fulfilled, (state, action) => {
      const { assessmentType, status } = action.payload
      if (state.status.assessments[assessmentType]) {
        state.status.assessments[assessmentType].status = status
      }
    })
  },
})

export const CountryActions = {
  ...countrySlice.actions,
  initCountry,
  fetchCountryStatus,
  changeAssessmentStatus,
}

export default countrySlice.reducer as Reducer<CountryState>
