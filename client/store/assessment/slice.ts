import { createSlice, Reducer } from '@reduxjs/toolkit'
import { Country } from '@meta/area'

import { AssessmentState } from './stateType'
import { initApp } from './actions/initApp'
import { getSections } from './actions/getSections'

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
      // @ts-ignore
      state.countries = (payload.countries as Array<Country>).reduce(
        (countiesAcc, country) => ({ ...countiesAcc, [country.countryIso]: country }),
        {}
      )
      state.regionGroups = payload.regionGroups
    })
    builder.addCase(getSections.fulfilled, (state, { payload }) => {
      state.sections = payload
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
  getCountry,
  updateCountry,
  initApp,
}

export default assessmentSlice.reducer as Reducer<AssessmentState>
