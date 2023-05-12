import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit'

import { CountryIso } from '@meta/area'
import { AssessmentName, CycleName } from '@meta/assessment'
import { NodeUpdate, NodeUpdates, TableDatas } from '@meta/data'

import { AssessmentActions } from '@client/store/assessment'

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
import { AssessmentSectionCycleState, AssessmentSectionState } from './stateType'

const initialAssessmentSectionCycleState: AssessmentSectionCycleState = {
  data: null,
  descriptions: {},
  linkedDataSources: {},
  tableSections: {},
  nodeValueValidation: {},
}

const initialState: AssessmentSectionState = {
  estimationPending: false,
  showOriginalDataPoint: true,
}

export const assessmentSectionSlice = createSlice({
  name: 'assessmentSection',
  initialState,
  reducers: {
    reset: () => initialState,
    toggleShowOriginalDataPoint: (state) => {
      state.showOriginalDataPoint = !state.showOriginalDataPoint
    },

    setNodeValues: (state, action: PayloadAction<{ nodeUpdates: NodeUpdates }>) => {
      const { nodeUpdates } = action.payload
      const { countryIso, nodes, assessment, cycle } = nodeUpdates

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
      { payload }: PayloadAction<{ nodeUpdate: NodeUpdate; assessmentName: AssessmentName; cycleName: CycleName }>
    ) => {
      const { assessmentName, cycleName, nodeUpdate } = payload
      state[assessmentName][cycleName].nodeValueValidation[nodeUpdate.tableName] = nodeUpdate
    },
    deleteOriginalDataPoint: (
      state,
      {
        payload,
      }: PayloadAction<{ countryIso: CountryIso; year: string; assessmentName: AssessmentName; cycleName: CycleName }>
    ) => {
      // Delete reference from state for deleted ODP
      const { countryIso, year, cycleName, assessmentName } = payload
      const odpReference = state[assessmentName][cycleName].data?.[countryIso]?.originalDataPointValue?.[year]
      if (odpReference) delete state[assessmentName][cycleName].data?.[countryIso]?.originalDataPointValue?.[year]
    },
  },
  extraReducers: (builder) => {
    builder.addCase(AssessmentActions.getAssessment.fulfilled, (state, { payload }) => {
      if (!state[payload.props.name]) {
        state[payload.props.name] = {}
        payload.cycles.forEach((cycle) => {
          state[payload.props.name][cycle.name] = initialAssessmentSectionCycleState
        })
      }
    })

    builder.addCase(setTableSections, (state, { payload }) => {
      const { tableSections, assessmentName, cycleName } = payload
      state[assessmentName][cycleName].tableSections = {
        ...state[assessmentName][cycleName].tableSections,
        ...tableSections,
      }
    })

    builder.addCase(getTableData.fulfilled, (state, { payload, meta }) => {
      const {
        arg: { assessmentName, cycleName },
      } = meta
      const countryIso = Object.keys(payload || {})[0] as CountryIso
      if (countryIso) {
        const countryData = state[assessmentName][cycleName].data?.[countryIso] ?? {}
        state[assessmentName][cycleName].data = {
          ...state[assessmentName][cycleName].data,
          [countryIso]: { ...countryData, ...payload[countryIso] },
        }
      }
    })

    builder.addCase(getOriginalDataPointData.fulfilled, (state, { payload, meta }) => {
      const {
        arg: { assessmentName, cycleName },
      } = meta
      const countryIso = Object.keys(payload)[0] as CountryIso
      const countryData = state[assessmentName][cycleName].data?.[countryIso] ?? {}
      state[assessmentName][cycleName].data = {
        ...state[assessmentName][cycleName].data,
        [countryIso]: { ...countryData, ...payload[countryIso] },
      }
    })

    builder.addCase(updateNodeValues.pending, (state, { meta }) => {
      const { countryIso, tableName, values, assessmentName, cycleName } = meta.arg
      values.forEach((valueUpdate) => {
        const { colName, value, variableName } = valueUpdate
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
      const {
        arg: { assessmentName, cycleName },
      } = meta
      if (!state[assessmentName][cycleName].descriptions[sectionName])
        state[assessmentName][cycleName].descriptions[sectionName] = {}
      state[assessmentName][cycleName].descriptions[sectionName][name] = value
    })

    builder.addCase(getLinkedDataSources.fulfilled, (state, { payload, meta }) => {
      const { dataSources, sectionName } = payload
      const {
        arg: { assessmentName, cycleName },
      } = meta

      state[assessmentName][cycleName].linkedDataSources[sectionName] = dataSources
    })

    builder.addCase(updateDescription.pending, (state, { meta }) => {
      const { sectionName, name, value, assessmentName, cycleName } = meta.arg

      if (!state[assessmentName][cycleName].descriptions[sectionName])
        state[assessmentName][cycleName].descriptions[sectionName] = {}
      state[assessmentName][cycleName].descriptions[sectionName][name] = value
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
