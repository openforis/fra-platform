import { createSlice, Reducer } from '@reduxjs/toolkit'
import { AssessmentState } from './stateType'
import { initApp } from './actions/initApp'
import { getSections } from './actions/getSections'
import { getCountryStatus } from './actions/getCountryStatus'
import { postCountryStatus } from './actions/postCountryStatus'

import { getCountry } from './actions/getCountry'
import { updateCountry } from './actions/updateCountry'

const initialState: AssessmentState = {}

export const assessmentSlice = createSlice({
  name: 'assessment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initApp.fulfilled, (state, { payload }) => {
      state.assessment = payload.assessment
      state.countryISOs = payload.countryISOs
      state.regionGroups = payload.regionGroups
    })
    builder.addCase(getSections.fulfilled, (state, { payload }) => {
      state.sections = payload
    })

    builder.addCase(getCountryStatus.fulfilled, (state, { payload }) => {
      state.countryStatus = payload
    })
    builder.addCase(postCountryStatus.fulfilled, (state, { payload }) => {
      state.countryStatus = payload
    })

    builder.addCase(getCountry.fulfilled, (state, { payload }) => {
      state.country = payload
    })

    builder.addCase(updateCountry.fulfilled, (state, { payload }) => {
      state.country = payload
    })
  },
})

export const AssessmentActions = {
  getSections,
  getCountryStatus,
  getCountry,
  postCountryStatus,
  updateCountry,
  initApp,
}

export default assessmentSlice.reducer as Reducer<AssessmentState>
