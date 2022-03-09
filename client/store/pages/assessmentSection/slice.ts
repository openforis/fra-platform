import { createSlice, Reducer } from '@reduxjs/toolkit'
import { CountryIso } from '@meta/area'
import { TableDatas } from '@meta/data'

import { AssessmentSectionState } from './stateType'
import { getTableSections } from './actions/getTableSections'
import { updateNodeValue } from './actions/updateNodeValue'
import { getTableData } from './actions/getTableData'

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
      const countryData = (state.data && state.data[countryIso]) || {}
      state.data = { ...state.data, [countryIso]: { ...payload[countryIso], ...countryData } }
    })

    builder.addCase(updateNodeValue.fulfilled, (state, { payload }) => {
      const { colName, countryIso, tableName, variableName, value } = payload
      state.data = TableDatas.updateDatum({ colName, countryIso, tableName, data: state.data, variableName, value })
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
