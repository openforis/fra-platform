import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit'

import { CountryIso } from '@meta/area'
import { NodeUpdate, NodeUpdates, TableDatas } from '@meta/data'

import { clearTableData } from './actions/clearTableData'
import { copyPreviousDatasources } from './actions/copyPreviousDatasources'
import { getDescription } from './actions/getDescription'
import { getLinkedDataSources } from './actions/getLinkedDataSources'
import { getOriginalDataPointData } from './actions/getOriginalDataPointData'
import { getTableData } from './actions/getTableData'
import { getTableSections } from './actions/getTableSections'
import { postEstimate } from './actions/postEstimate'
import { setTableSections } from './actions/setTableSections'
import { updateDescription } from './actions/updateDescription'
import { updateNodeValues } from './actions/updateNodeValues'
import { AssessmentSectionBaseState, AssessmentSectionState } from './stateType'

const baseState: AssessmentSectionBaseState = {
  data: null,
  descriptions: {},
  linkedDataSources: {},
  nodeValueValidation: {},
  tableSections: {},
}

const initialState: AssessmentSectionState = {
  estimationPending: false,
  showOriginalDataPoint: true,
}

export const assessmentSectionSlice = createSlice({
  name: 'assessmentSection',
  initialState,
  reducers: {
    toggleShowOriginalDataPoint: (state) => {
      state.showOriginalDataPoint = !state.showOriginalDataPoint
    },

    setNodeValues: (state, action: PayloadAction<{ nodeUpdates: NodeUpdates }>) => {
      const { nodeUpdates } = action.payload
      const { countryIso, nodes, assessment, cycle } = nodeUpdates

      if (!state[assessment.props.name]) {
        state[assessment.props.name] = {}
      }

      if (!state[assessment.props.name][cycle.name]) {
        state[assessment.props.name][cycle.name] = baseState
      }

      nodes.forEach(({ tableName, variableName, colName, value }) => {
        state[assessment.props.name][cycle.name].data = TableDatas.updateDatum({
          data: state[assessment.props.name][cycle.name].data,
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

      if (!state[assessment.props.name]) {
        state[assessment.props.name] = {}
      }

      if (!state[assessment.props.name][cycle.name]) {
        state[assessment.props.name][cycle.name] = baseState
      }

      nodes.forEach(({ tableName, variableName, colName, value }) => {
        state[assessment.props.name][cycle.name].data = TableDatas.updateDatumValidation({
          data: state[assessment.props.name][cycle.name].data,
          countryIso,
          tableName,
          variableName,
          colName,
          validation: value.validation,
        })
      })
    },

    setNodeCalculations: (state, action: PayloadAction<{ nodeUpdates: NodeUpdates }>) => {
      const { nodeUpdates } = action.payload
      const { countryIso, nodes, assessment, cycle } = nodeUpdates

      if (!state[assessment.props.name]) {
        state[assessment.props.name] = {}
      }

      if (!state[assessment.props.name][cycle.name]) {
        state[assessment.props.name][cycle.name] = baseState
      }

      nodes.forEach(({ tableName, variableName, colName, value }) => {
        state[assessment.props.name][cycle.name].data = TableDatas.updateDatum({
          data: state[assessment.props.name][cycle.name].data,
          countryIso,
          tableName,
          variableName,
          colName,
          value,
        })
      })
    },
    setNodeValidationToDisplay: (
      state,
      { payload }: PayloadAction<{ nodeUpdate: NodeUpdate & { assessmentName: string; cycleName: string } }>
    ) => {
      const { nodeUpdate } = payload
      const { assessmentName, cycleName } = nodeUpdate

      if (!state[assessmentName]) {
        state[assessmentName] = {}
      }

      if (!state[assessmentName][cycleName]) {
        state[assessmentName][cycleName] = baseState
      }

      state[assessmentName][cycleName].nodeValueValidation[nodeUpdate.tableName] = nodeUpdate
    },
    deleteOriginalDataPoint: (
      state,
      { payload }: PayloadAction<{ assessmentName: string; cycleName: string; countryIso: CountryIso; year: string }>
    ) => {
      // Delete reference from state for deleted ODP
      const { countryIso, year, cycleName, assessmentName } = payload
      const odpReference = state[assessmentName][cycleName].data?.[countryIso]?.originalDataPointValue?.[year]
      if (odpReference) delete state[assessmentName][cycleName].data?.[countryIso]?.originalDataPointValue?.[year]
    },
  },
  extraReducers: (builder) => {
    // TODO: Listen to init assessment and initialise base state for assessment
    builder.addCase(setTableSections, (state, { payload }) => {
      const { tableSections, assessmentName, cycleName } = payload
      if (!state[assessmentName]) {
        state[assessmentName] = {}
      }

      if (!state[assessmentName][cycleName]) {
        state[assessmentName][cycleName] = baseState
      }

      state[assessmentName][cycleName].tableSections = {
        ...state[assessmentName][cycleName].tableSections,
        ...tableSections,
      }
    })

    builder.addCase(getTableData.fulfilled, (state, { payload, meta }) => {
      const countryIso = Object.keys(payload || {})[0] as CountryIso
      const { assessmentName, cycleName } = meta.arg
      if (!state[assessmentName]) state[assessmentName] = {}
      if (!state[assessmentName][cycleName]) state[assessmentName][cycleName] = baseState
      // state.data = { ...state.data, [countryIso]: { ...countryData, ...payload[countryIso] } }

      if (countryIso) {
        const countryData = state[assessmentName][cycleName].data?.[countryIso] ?? {}
        state[assessmentName][cycleName].data = {
          ...state[assessmentName][cycleName].data,
          [countryIso]: { ...countryData, ...payload[countryIso] },
        }
      }
    })

    builder.addCase(getOriginalDataPointData.fulfilled, (state, { payload, meta }) => {
      const countryIso = Object.keys(payload)[0] as CountryIso
      const { assessmentName, cycleName } = meta.arg
      if (!state[assessmentName]) {
        state[assessmentName] = {}
      }

      if (!state[assessmentName][cycleName]) {
        state[assessmentName][cycleName] = baseState
      }

      // const countryData = state.data?.[countryIso] ?? {}
      // state.data = { ...state.data, [countryIso]: { ...countryData, ...payload[countryIso] } }
      const countryData = state[assessmentName][cycleName].data?.[countryIso] ?? {}
      state[assessmentName][cycleName].data = {
        ...state[assessmentName][cycleName].data,
        [countryIso]: { ...countryData, ...payload[countryIso] },
      }
    })

    builder.addCase(updateNodeValues.pending, (state, { meta }) => {
      const { countryIso, tableName, values, cycleName, assessmentName } = meta.arg
      if (!state[assessmentName]) {
        state[assessmentName] = {}
      }

      if (!state[assessmentName][cycleName]) {
        state[assessmentName][cycleName] = baseState
      }

      values.forEach((valueUpdate) => {
        const { colName, value, variableName } = valueUpdate
        // state.data = TableDatas.updateDatum({ colName, countryIso, tableName, data: state.data, variableName, value })
        state[assessmentName][cycleName].data = TableDatas.updateDatum({
          colName,
          countryIso,
          tableName,
          data: state[assessmentName][cycleName].data,
          variableName,
          value,
        })
      })
    })

    builder.addCase(getDescription.fulfilled, (state, { payload, meta }) => {
      const { name, sectionName, value } = payload
      const { assessmentName, cycleName } = meta.arg

      if (!state[assessmentName]) state[assessmentName] = {}
      if (!state[assessmentName][cycleName]) state[assessmentName][cycleName] = baseState
      if (!state[assessmentName][cycleName].descriptions) state[assessmentName][cycleName].descriptions = {}
      if (!state[assessmentName][cycleName].descriptions[sectionName])
        state[assessmentName][cycleName].descriptions[sectionName] = {}
      state[assessmentName][cycleName].descriptions[sectionName][name] = value
      // if (!state.descriptions[sectionName]) state.descriptions[sectionName] = {}
      // state.descriptions[sectionName][name] = value
    })

    builder.addCase(getLinkedDataSources.fulfilled, (state, { payload, meta }) => {
      const { dataSources, sectionName } = payload
      const { assessmentName, cycleName } = meta.arg

      if (!state[assessmentName]) state[assessmentName] = {}
      if (!state[assessmentName][cycleName]) state[assessmentName][cycleName] = baseState
      if (!state[assessmentName][cycleName].linkedDataSources) state[assessmentName][cycleName].linkedDataSources = {}

      state[assessmentName][cycleName].linkedDataSources[sectionName] = dataSources
    })

    builder.addCase(updateDescription.pending, (state, { meta }) => {
      const { sectionName, name, value, assessmentName, cycleName } = meta.arg

      if (!state[assessmentName]) state[assessmentName] = {}
      if (!state[assessmentName][cycleName]) state[assessmentName][cycleName] = baseState
      if (!state[assessmentName][cycleName].descriptions) state[assessmentName][cycleName].descriptions = {}
      if (!state[assessmentName][cycleName].descriptions[sectionName])
        state[assessmentName][cycleName].descriptions[sectionName] = {}
      state[assessmentName][cycleName].descriptions[sectionName][name] = value

      // if (!state.descriptions[sectionName]) state.descriptions[sectionName] = {}
      // state.descriptions[sectionName][name] = value
    })

    builder.addCase(postEstimate.pending, (state) => {
      state.estimationPending = true
    })

    builder.addCase(postEstimate.fulfilled, (state) => {
      state.estimationPending = false
    })
  },
})

export const AssessmentSectionActions = {
  ...assessmentSectionSlice.actions,
  clearTableData,
  copyPreviousDatasources,
  getDescription,
  getLinkedDataSources,
  getOriginalDataPointData,
  getTableData,
  getTableSections,
  postEstimate,
  updateDescription,
  updateNodeValues,
}

export default assessmentSectionSlice.reducer as Reducer<AssessmentSectionState>
