import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit'

import { CountryIso } from '@meta/area'
import { AssessmentName, CycleName } from '@meta/assessment'
import { NodeUpdates, TableData, TableDatas } from '@meta/data'

import { AssessmentActions } from '@client/store/assessment'

import { clearTableData } from './actions/clearTableData'
import { copyPreviousDatasources } from './actions/copyPreviousDatasources'
import { getDescription } from './actions/getDescription'
import { getLinkedDataSources } from './actions/getLinkedDataSources'
import { getOriginalDataPointData } from './actions/getOriginalDataPointData'
import { getTableData } from './actions/getTableData'
import { postEstimate } from './actions/postEstimate'
import { updateDescription } from './actions/updateDescription'
import { updateNodeValues } from './actions/updateNodeValues'
import { DataBaseState, DataState } from './stateType'

const baseState: DataBaseState = {
  tableData: {} as TableData,
  descriptions: {},
  linkedDataSources: {},
}

const initialState: DataState = {}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setNodeValues: (state, action: PayloadAction<{ nodeUpdates: NodeUpdates }>) => {
      const { nodeUpdates } = action.payload
      const { countryIso, nodes, assessment, cycle } = nodeUpdates

      nodes.forEach(({ tableName, variableName, colName, value }) => {
        state[assessment.props.name][cycle.name].tableData = TableDatas.updateDatum({
          data: state[assessment.props.name][cycle.name].tableData,
          countryIso,
          tableName,
          variableName,
          colName,
          value,
        })
      })
    },
    setNodeCalculations: (state, action: PayloadAction<{ nodeUpdates: NodeUpdates }>) => {
      const { nodeUpdates } = action.payload
      const { countryIso, nodes, assessment, cycle } = nodeUpdates

      nodes.forEach(({ tableName, variableName, colName, value }) => {
        state[assessment.props.name][cycle.name].tableData = TableDatas.updateDatum({
          data: state[assessment.props.name][cycle.name].tableData,
          countryIso,
          tableName,
          variableName,
          colName,
          value,
        })
      })
    },
    setNodeValidations: (state, action: PayloadAction<{ nodeUpdates: NodeUpdates }>) => {
      const { nodeUpdates } = action.payload
      const { countryIso, nodes, assessment, cycle } = nodeUpdates

      nodes.forEach(({ tableName, variableName, colName, value }) => {
        state[assessment.props.name][cycle.name].tableData = TableDatas.updateDatumValidation({
          data: state[assessment.props.name][cycle.name].tableData,
          countryIso,
          tableName,
          variableName,
          colName,
          validation: value.validation,
        })
      })
    },

    deleteOriginalDataPoint: (
      state,
      {
        payload,
      }: PayloadAction<{ countryIso: CountryIso; year: string; assessmentName: AssessmentName; cycleName: CycleName }>
    ) => {
      // Delete reference from state for deleted ODP
      const { countryIso, year, cycleName, assessmentName } = payload
      const odpReference = state[assessmentName][cycleName].tableData[countryIso]?.originalDataPointValue?.[year]
      if (odpReference) delete state[assessmentName][cycleName].tableData[countryIso]?.originalDataPointValue?.[year]
    },
  },
  extraReducers: (builder) => {
    // Initialise state[assessmentName].[cycleName] with baseState
    builder.addCase(AssessmentActions.getAssessment.fulfilled, (state, { payload }) => {
      if (!state[payload.props.name]) {
        state[payload.props.name] = {}
        payload.cycles.forEach((cycle) => {
          state[payload.props.name][cycle.name] = baseState
        })
      }
    })

    // Table data
    builder.addCase(getTableData.fulfilled, (state, { payload, meta }) => {
      const {
        arg: { assessmentName, cycleName },
      } = meta
      const countryIso = Object.keys(payload || {})[0] as CountryIso
      if (countryIso) {
        const countryData = state[assessmentName][cycleName].tableData[countryIso] ?? {}
        state[assessmentName][cycleName].tableData = {
          ...state[assessmentName][cycleName].tableData,
          [countryIso]: { ...countryData, ...payload[countryIso] },
        }
      }
    })

    builder.addCase(updateNodeValues.pending, (state, { meta }) => {
      const { countryIso, tableName, values, assessmentName, cycleName } = meta.arg
      values.forEach((valueUpdate) => {
        const { colName, value, variableName } = valueUpdate
        state[assessmentName][cycleName].tableData = TableDatas.updateDatum({
          colName,
          countryIso,
          tableName,
          data: state[assessmentName][cycleName].tableData,
          variableName,
          value,
        })
      })
    })

    builder.addCase(getOriginalDataPointData.fulfilled, (state, { payload, meta }) => {
      const {
        arg: { assessmentName, cycleName },
      } = meta
      const countryIso = Object.keys(payload)[0] as CountryIso
      const countryData = state[assessmentName][cycleName].tableData?.[countryIso] ?? {}
      state[assessmentName][cycleName].tableData = {
        ...state[assessmentName][cycleName].tableData,
        [countryIso]: { ...countryData, ...payload[countryIso] },
      }
    })

    // descriptions
    builder.addCase(getDescription.fulfilled, (state, { payload, meta }) => {
      const { name, sectionName, value } = payload
      const {
        arg: { assessmentName, cycleName },
      } = meta
      if (!state[assessmentName][cycleName].descriptions[sectionName]) {
        state[assessmentName][cycleName].descriptions[sectionName] = {}
      }
      state[assessmentName][cycleName].descriptions[sectionName][name] = value
    })

    builder.addCase(updateDescription.pending, (state, { meta }) => {
      const { sectionName, name, value, assessmentName, cycleName } = meta.arg

      if (!state[assessmentName][cycleName].descriptions[sectionName]) {
        state[assessmentName][cycleName].descriptions[sectionName] = {}
      }

      state[assessmentName][cycleName].descriptions[sectionName][name] = value
    })

    builder.addCase(getLinkedDataSources.fulfilled, (state, { payload, meta }) => {
      const { dataSources, sectionName } = payload
      const {
        arg: { assessmentName, cycleName },
      } = meta

      state[assessmentName][cycleName].linkedDataSources[sectionName] = dataSources
    })
  },
})

export const DataActions = {
  ...dataSlice.actions,
  // Table data
  clearTableData,
  getTableData,
  updateNodeValues,

  // Original Data Point Table data
  getOriginalDataPointData,

  // Estimations
  postEstimate,

  // Descriptions
  getDescription,
  updateDescription,
  copyPreviousDatasources,
  getLinkedDataSources,
}

export default dataSlice.reducer as Reducer<DataState>
