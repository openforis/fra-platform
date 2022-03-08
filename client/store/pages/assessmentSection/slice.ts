import { createSlice, Reducer } from '@reduxjs/toolkit'
import { getTableSections } from '@client/store/pages/assessmentSection/actions/getTableSections'
import { updateNodeValue } from '@client/store/pages/assessmentSection/actions/updateNodeValue'
import { CountryIso } from '@meta/area'
import { getTableData } from './actions/getTableData'
import { AssessmentSectionState } from './stateType'

const initialState: AssessmentSectionState = {
  data: null,
  tableSections: [],
  // TODO: Should this be global for all ajax calls?
  updating: false,
}

export const assessmentSectionSlice = createSlice({
  name: 'assessmentSection',
  initialState,
  reducers: {
    reset: () => initialState,
    resetData: (state) => {
      state.data = initialState.data
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTableSections.fulfilled, (state, { payload }) => {
      state.tableSections = payload
    })

    builder.addCase(getTableData.fulfilled, (state, { payload }) => {
      const countryIso = Object.keys(payload)[0] as CountryIso
      const countryData = (state.data && state.data[countryIso]) || {}
      state.data = { ...state.data, [countryIso]: { ...payload[countryIso], ...countryData } }
    })

    builder
      .addCase(updateNodeValue.fulfilled, (state, { payload }) => {
        state.updating = false
        state.data = payload
      })
      .addCase(updateNodeValue.pending, (state) => {
        state.updating = true
      })
  },
})

export const AssessmentSectionActions = {
  ...assessmentSectionSlice.actions,
  getTableSections,
  getTableData,
  updateNodeValue,
}

export default assessmentSectionSlice.reducer as Reducer<AssessmentSectionState>
