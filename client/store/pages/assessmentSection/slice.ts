import { CountryIso } from '@meta/area'
import { TableDatas } from '@meta/data'
import { createSlice, Reducer } from '@reduxjs/toolkit'

import { getOriginalDataPointData } from './actions/getOriginalDataPointData'
import { getTableData } from './actions/getTableData'
import { getTableSections } from './actions/getTableSections'
import { setTableSections } from './actions/setTableSections'
import { updateNodeValue } from './actions/updateNodeValue'
import { AssessmentSectionState } from './stateType'

const initialState: AssessmentSectionState = {
  data: null,
  tableSections: {},
  originalDataPointData: null,
  showOriginalDataPoint: true,
}

export const assessmentSectionSlice = createSlice({
  name: 'assessmentSection',
  initialState,
  reducers: {
    reset: () => initialState,
    resetData: (state) => {
      state.data = initialState.data
    },
    toggleShowOriginalDataPoint: (state) => {
      state.showOriginalDataPoint = !state.showOriginalDataPoint
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setTableSections, (state, { payload }) => {
      const { sectionName, tableSections } = payload
      state.tableSections = { ...state.tableSections, [sectionName]: tableSections }
    })

    builder.addCase(getTableData.fulfilled, (state, { payload }) => {
      const countryIso = Object.keys(payload || {})[0] as CountryIso
      if (countryIso) {
        const countryData = (state.data && state.data[countryIso]) || {}
        state.data = { ...state.data, [countryIso]: { ...payload[countryIso], ...countryData } }
      }
    })

    builder.addCase(updateNodeValue.fulfilled, (state, { payload }) => {
      const { colName, countryIso, tableName, variableName, value } = payload
      state.data = TableDatas.updateDatum({ colName, countryIso, tableName, data: state.data, variableName, value })
    })

    builder.addCase(getOriginalDataPointData.fulfilled, (state, { payload }) => {
      state.originalDataPointData = payload
    })
  },
})

export const AssessmentSectionActions = {
  ...assessmentSectionSlice.actions,
  getTableSections,
  getTableData,
  getOriginalDataPointData,
  updateNodeValue,
}

export default assessmentSectionSlice.reducer as Reducer<AssessmentSectionState>
