import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit'

import { CountryIso } from '@meta/area'
import { NodeUpdate, TableData, TableDatas } from '@meta/data'

import { getDescription } from './actions/getDescription'
import { getOriginalDataPointData } from './actions/getOriginalDataPointData'
import { getTableData } from './actions/getTableData'
import { getTableSections } from './actions/getTableSections'
import { postEstimate } from './actions/postEstimate'
import { setTableSections } from './actions/setTableSections'
import { updateDescription } from './actions/updateDescription'
import { updateNodeValues } from './actions/updateNodeValues'
import { AssessmentSectionState } from './stateType'

const initialState: AssessmentSectionState = {
  data: null,
  tableSections: {},
  showOriginalDataPoint: true,
  nodeValueValidation: {},
  descriptions: {},
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
    setNodeValue: (state, { payload }: PayloadAction<{ countryIso: CountryIso; nodeUpdate: NodeUpdate }>) => {
      const { countryIso, nodeUpdate } = payload
      const { tableName, variableName, colName, value } = nodeUpdate
      const data = (state.data ?? {}) as TableData
      const dataUpdate = TableDatas.updateDatum({ data, countryIso, tableName, variableName, colName, value })
      state.data = { ...data, ...dataUpdate }
    },
    setNodeValueValidation: (state, { payload }: PayloadAction<{ nodeUpdate: NodeUpdate }>) => {
      const { nodeUpdate } = payload
      state.nodeValueValidation[nodeUpdate.tableName] = nodeUpdate
    },
    deleteOriginalDataPoint: (state, { payload }: PayloadAction<{ countryIso: CountryIso; year: string }>) => {
      // Delete reference from state for deleted ODP
      const { countryIso, year } = payload
      const odpReference = state.data?.[countryIso]?.originalDataPointValue?.[year]
      if (odpReference) delete state.data?.[countryIso]?.originalDataPointValue?.[year]
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setTableSections, (state, { payload }) => {
      const { tableSections } = payload
      state.tableSections = { ...state.tableSections, ...tableSections }
    })

    builder.addCase(getTableData.fulfilled, (state, { payload }) => {
      const countryIso = Object.keys(payload || {})[0] as CountryIso
      if (countryIso) {
        const countryData = state.data?.[countryIso] ?? {}
        state.data = { ...state.data, [countryIso]: { ...countryData, ...payload[countryIso] } }
      }
    })

    builder.addCase(getOriginalDataPointData.fulfilled, (state, { payload }) => {
      const countryIso = Object.keys(payload)[0] as CountryIso
      const countryData = state.data?.[countryIso] ?? {}
      state.data = { ...state.data, [countryIso]: { ...countryData, ...payload[countryIso] } }
    })

    builder.addCase(updateNodeValues.pending, (state, { meta }) => {
      const { countryIso, tableName, values } = meta.arg
      values.forEach((valueUpdate) => {
        const { colName, value, variableName } = valueUpdate
        state.data = TableDatas.updateDatum({ colName, countryIso, tableName, data: state.data, variableName, value })
      })
    })

    builder.addCase(getDescription.fulfilled, (state, { payload }) => {
      const { name, sectionName, value } = payload
      if (!state.descriptions[sectionName]) state.descriptions[sectionName] = {}
      state.descriptions[sectionName][name] = value
    })

    builder.addCase(updateDescription.pending, (state, { meta }) => {
      const { sectionName, name, value } = meta.arg

      if (!state.descriptions[sectionName]) state.descriptions[sectionName] = {}
      state.descriptions[sectionName][name] = value
    })
  },
})

export const AssessmentSectionActions = {
  ...assessmentSectionSlice.actions,
  getDescription,
  getTableSections,
  getTableData,
  getOriginalDataPointData,
  updateDescription,
  updateNodeValues,
  postEstimate,
}

export default assessmentSectionSlice.reducer as Reducer<AssessmentSectionState>
