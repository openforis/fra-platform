import { createSlice, Reducer } from '@reduxjs/toolkit'

import { updateNodeValues } from '../ui/assessmentSection/actions/updateNodeValues'
import { getAreas, getAssessment, getSections, initApp, updateCountry, updateCountryProp } from './actions'
import { AssessmentState } from './stateType'

const initialState: AssessmentState = {
  appInitialized: false,
}

export const assessmentSlice = createSlice({
  name: 'assessment',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getAreas.fulfilled, (state, { payload, meta }) => {
      const { countries, regionGroups } = payload
      const {
        arg: { assessmentName, cycleName },
      } = meta

      if (!state[assessmentName]) {
        state[assessmentName] = {}
      }

      if (!state[assessmentName][cycleName]) {
        state[assessmentName][cycleName] = {}
      }

      state[assessmentName][cycleName].countries = countries.reduce(
        (countriesAcc, country) => ({ ...countriesAcc, [country.countryIso]: country }),
        {}
      )

      state[assessmentName][cycleName].regionGroups = regionGroups
    })

    builder.addCase(getAssessment.fulfilled, (state, { payload }) => {
      state[payload.props.name] = payload
    })

    builder.addCase(getSections.fulfilled, (state, { payload, meta }) => {
      const {
        arg: { assessmentName, cycleName },
      } = meta
      if (!state[assessmentName]) {
        state[assessmentName] = {}
      }

      if (!state[assessmentName][cycleName]) {
        state[assessmentName][cycleName] = {}
      }

      state[assessmentName][cycleName].sections = payload
    })

    builder.addCase(updateCountry.fulfilled, (state, { payload, meta }) => {
      const {
        arg: { assessmentName, cycleName },
      } = meta
      state[assessmentName][cycleName].countries[payload.countryIso] = {
        ...state.countries[payload.countryIso],
        ...payload,
      }
    })

    builder.addCase(updateCountryProp.pending, (state, reducer) => {
      const {
        meta: { arg },
      } = reducer

      const { countryIso, countryProp, assessmentName, cycleName } = arg

      state[assessmentName][cycleName].countries[countryIso].props = {
        ...state.countries[countryIso].props,
        ...countryProp,
      }
    })

    builder.addCase(initApp.pending, (state) => {
      state.appInitialized = false
    })

    builder.addCase(initApp.fulfilled, (state) => {
      state.appInitialized = true
    })

    builder.addCase(updateNodeValues.fulfilled, (state, payload) => {
      const { countryIso, assessmentName, cycleName } = payload.meta.arg
      if (state[assessmentName][cycleName].countries[countryIso])
        state[assessmentName][cycleName].countries[countryIso].lastEdit = new Date().toISOString()
    })
  },
})

export const AssessmentActions = {
  ...assessmentSlice.actions,
  initApp,
  getAssessment,
  getAreas,
  getSections,
  updateCountry,
  updateCountryProp,
}

export default assessmentSlice.reducer as Reducer<AssessmentState>
