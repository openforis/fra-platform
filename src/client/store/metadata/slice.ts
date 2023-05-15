import { createSlice, Reducer } from '@reduxjs/toolkit'

import { AssessmentActions } from '@client/store/assessment'

import { getTableSections } from './actions/getTableSections'
import { setTableSections } from './actions/setTableSections'
import { MetadataBaseState, MetadataState } from './stateType'

const initialMetadata: MetadataBaseState = {
  tableSections: {},
  nodeValueValidation: {},
}

const initialState: MetadataState = {}

export const metadataSlice = createSlice({
  name: 'metadata',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Initialise state.[assessmentName].[cycleName] with initialMetadata
    builder.addCase(AssessmentActions.getAssessment.fulfilled, (state, { payload }) => {
      if (!state[payload.props.name]) {
        state[payload.props.name] = {}
        payload.cycles.forEach((cycle) => {
          state[payload.props.name][cycle.name] = initialMetadata
        })
      }
    })

    // Table Sections
    builder.addCase(setTableSections, (state, { payload }) => {
      const { tableSections, assessmentName, cycleName } = payload
      state[assessmentName][cycleName].tableSections = {
        ...state[assessmentName][cycleName].tableSections,
        ...tableSections,
      }
    })
  },
})

export const MetadataActions = {
  ...metadataSlice.actions,
  getTableSections,
}

export default metadataSlice.reducer as Reducer<MetadataState>
