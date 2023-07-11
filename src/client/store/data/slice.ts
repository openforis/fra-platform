import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { NodeUpdates, RecordAssessmentDatas } from 'meta/data'

import { AssessmentActions } from 'client/store/assessment'
import { deleteOriginalDataPoint } from 'client/store/data/reducers/deleteOriginalDataPoint'
import { setNodeValues } from 'client/store/data/reducers/setNodeValues'
import { setNodeValueValidation } from 'client/store/data/reducers/setNodeValueValidation'

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
import { DataBaseState, DataState } from './stateType'

const baseState: DataBaseState = {
  descriptions: {},
  linkedDataSources: {},
}

const initialState: DataState = {
  nodeValuesEstimations: {},
  nodeValueValidations: {},
  odpLastUpdatedTimestamp: {},
  tableData: {},
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setNodeValues,
    setNodeValueValidation,
    deleteOriginalDataPoint,
    /**
     * @deprecated
     */
    setNodeCalculations: (state, action: PayloadAction<{ nodeUpdates: NodeUpdates }>) => {
      const { nodeUpdates } = action.payload
      const { countryIso, nodes, assessment, cycle } = nodeUpdates

      nodes.forEach(({ tableName, variableName, colName, value }) => {
        state.tableData = RecordAssessmentDatas.updateDatum({
          assessmentName: assessment.props.name,
          cycleName: cycle.name,
          data: state.tableData,
          countryIso,
          tableName,
          variableName,
          colName,
          value,
        })
      })
    },
  },

  extraReducers: (builder) => {
    // Initialise state[assessmentName].[cycleName] with baseState
    builder.addCase(AssessmentActions.getAssessment.fulfilled, (state, { payload }) => {
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

    // Table data
    builder.addCase(getTableData.fulfilled, (state, { payload }) => {
      state.tableData = RecordAssessmentDatas.mergeData({
        tableData: state.tableData,
        newTableData: payload,
      })
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
