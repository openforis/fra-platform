import { createSlice, Reducer } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { RecordAssessmentDatas } from 'meta/data'

import { getAssessment } from 'client/store/assessment/actions'
import { setNodeValues } from 'client/store/data/actions/setNodeValues'
import { setNodeValuesReducer } from 'client/store/data/extraReducers/setNodeValues'
import { deleteOriginalDataPoint } from 'client/store/data/reducers/deleteOriginalDataPoint'
import { setNodeValueValidations } from 'client/store/data/reducers/setNodeValueValidations'

import { clearTableData } from './actions/clearTableData'
import { copyPreviousDatasources } from './actions/copyPreviousDatasources'
import { getDescription } from './actions/getDescription'
import { getLinkedDataSources } from './actions/getLinkedDataSources'
import { getNodeValuesEstimations } from './actions/getNodeValuesEstimations'
import { getODPLastUpdatedTimestamp } from './actions/getODPLastUpdatedTimestamp'
import { getODPTableData } from './actions/getODPTableData'
import { getTableData } from './actions/getTableData'
import { postEstimate } from './actions/postEstimate'
import { updateDescription } from './actions/updateDescription'
import { updateNodeValues } from './actions/updateNodeValues'
import { DataBaseState, DataState, TableDataStatus } from './stateType'

const baseState: DataBaseState = {
  descriptions: {},
  linkedDataSources: {},
}

const initialState: DataState = {
  nodeValuesEstimations: {},
  nodeValueValidations: {},
  odpLastUpdatedTimestamp: {},
  tableData: {},
  tableDataStatus: {},
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setNodeValueValidations,
    deleteOriginalDataPoint,
  },

  extraReducers: (builder) => {
    // Initialise state[assessmentName].[cycleName] with baseState
    builder.addCase(getAssessment.fulfilled, (state, { payload }) => {
      if (!state[payload.props.name]) {
        state[payload.props.name] = {}
        payload.cycles.forEach((cycle) => {
          state[payload.props.name][cycle.name] = baseState

          state.tableData = {
            ...state.tableData,
            [payload.props.name]: {
              ...state.tableData[payload.props.name],
              [cycle.name]: {
                ...(state.tableData[payload.props.name]?.[cycle.name] ?? {}),
              },
            },
          }
        })
      }
    })

    setNodeValuesReducer(builder)

    // Table data
    builder.addCase(getTableData.pending, (state, { meta }) => {
      const { assessmentName, cycleName, countryIso, tableName } = meta.arg
      const path = ['tableDataStatus', assessmentName, cycleName, countryIso, tableName]
      Objects.setInPath({ obj: state, path, value: TableDataStatus.fetching })
    })
    builder.addCase(getTableData.fulfilled, (state, { meta, payload }) => {
      // update table data
      state.tableData = RecordAssessmentDatas.mergeData({
        tableData: state.tableData,
        newTableData: payload,
      })
      // update table data status
      const { assessmentName, cycleName, countryIso, tableName } = meta.arg
      const path = ['tableDataStatus', assessmentName, cycleName, countryIso, tableName]
      Objects.setInPath({ obj: state, path, value: TableDataStatus.fetched })
    })

    builder.addCase(getNodeValuesEstimations.fulfilled, (state, { payload }) => {
      state.nodeValuesEstimations = { ...state.nodeValuesEstimations, ...payload }
    })

    builder.addCase(postEstimate.fulfilled, (state, { payload }) => {
      state.nodeValuesEstimations = payload.nodeValueEstimations
    })

    builder.addCase(updateNodeValues.pending, (state, { meta }) => {
      const { countryIso, tableName, values, assessmentName, cycleName } = meta.arg
      values.forEach((valueUpdate) => {
        const { colName, value, variableName } = valueUpdate

        state.tableData = RecordAssessmentDatas.updateDatum({
          assessmentName,
          cycleName,
          colName,
          countryIso,
          tableName,
          data: state.tableData,
          variableName,
          value,
        })
      })
    })

    builder.addCase(getODPTableData.fulfilled, (state, { payload }) => {
      state.tableData = RecordAssessmentDatas.mergeData({
        tableData: state.tableData,
        newTableData: payload,
      })
    })

    builder.addCase(getODPLastUpdatedTimestamp.fulfilled, (state, { payload }) => {
      const { assessmentName, countryIso, cycleName, time } = payload

      Objects.setInPath({
        obj: state.odpLastUpdatedTimestamp,
        path: [assessmentName, cycleName, countryIso],
        value: { time },
      })
    })

    // descriptions
    builder.addCase(getDescription.fulfilled, (state, { payload, meta }) => {
      const { name, sectionName, value } = payload
      const { assessmentName, cycleName } = meta.arg

      const path = [assessmentName, cycleName, 'descriptions', sectionName, name]
      Objects.setInPath({ obj: state, path, value })
    })

    builder.addCase(updateDescription.pending, (state, { meta }) => {
      const { sectionName, name, value, assessmentName, cycleName } = meta.arg

      const path = [assessmentName, cycleName, 'descriptions', sectionName, name]
      Objects.setInPath({ obj: state, path, value })
    })

    builder.addCase(getLinkedDataSources.fulfilled, (state, { payload, meta }) => {
      const { dataSources, sectionName } = payload
      const { assessmentName, cycleName } = meta.arg

      const path = [assessmentName, cycleName, 'linkedDataSources', sectionName]
      Objects.setInPath({ obj: state, path, value: dataSources })
    })
  },
})

export const DataActions = {
  ...dataSlice.actions,
  // Table data
  setNodeValues,
  clearTableData,
  getTableData,
  updateNodeValues,
  getNodeValuesEstimations,

  // Original Data Point
  getODPLastUpdatedTimestamp,
  getODPTableData,

  // Estimations
  postEstimate,

  // Descriptions
  getDescription,
  updateDescription,
  copyPreviousDatasources,
  getLinkedDataSources,
}

export default dataSlice.reducer as Reducer<DataState>
