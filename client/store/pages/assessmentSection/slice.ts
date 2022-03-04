import { createSlice, Reducer } from '@reduxjs/toolkit'
import { getTableSections } from '@client/store/pages/assessmentSection/actions/getTableSections'
import { CountryIso } from '@meta/area'
import { getTableData } from './actions/getTableData'
import { AssessmentSectionState } from './stateType'

const initialState: AssessmentSectionState = {
  data: null,
  tableSections: [],
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
      const countryData = state?.data?.[countryIso] ?? {}
      state.data = { ...state.data, [countryIso]: { ...payload[countryIso], ...countryData } }
    })
  },
})

export const AssessmentSectionActions = {
  ...assessmentSectionSlice.actions,
  getTableSections,
  getTableData,
}

export default assessmentSectionSlice.reducer as Reducer<AssessmentSectionState>
