import { createSlice, Reducer } from '@reduxjs/toolkit'
import { AssessmentState } from './stateType'
import { initApp } from './actions/initApp'
import { getSections } from './actions/getSections'
import { getCountryStatus } from './actions/getCountryStatus'
import { postCountryStatus } from './actions/postCountryStatus'
import { getSectionTablesMetadata } from './actions/getSectionTablesMetadata'

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
    builder.addCase(getSectionTablesMetadata.fulfilled, (state, { payload }) => {
      state.sectionMetaData = payload
    })
  },
})

export const AssessmentActions = {
  getSections,
  getSectionTablesMetadata,
  getCountryStatus,
  postCountryStatus,
  initApp,
}

export default assessmentSlice.reducer as Reducer<AssessmentState>
