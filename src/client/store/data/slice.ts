import { createSlice, isAnyOf, Reducer } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { RecordAssessmentDatas } from 'meta/data'

import { clearTableData } from './actions/clearTableData'
import { createContact } from './actions/contacts/createContact'
import { getContacts } from './actions/contacts/getContacts'
import { updateContact } from './actions/contacts/updateContact'
import { copyPreviousDatasources } from './actions/copyPreviousDatasources'
import { getDescription } from './actions/getDescription'
import { getLinkedDataSources } from './actions/getLinkedDataSources'
import { getNodeValuesEstimations } from './actions/getNodeValuesEstimations'
import { getODPLastUpdatedTimestamp } from './actions/getODPLastUpdatedTimestamp'
import { getODPTableData } from './actions/getODPTableData'
import { getTableData } from './actions/getTableData'
import { postEstimate } from './actions/postEstimate'
import { setNodeValues } from './actions/setNodeValues'
import { updateDescription } from './actions/updateDescription'
import { updateNodeValues } from './actions/updateNodeValues'
import { setNodeValuesReducer } from './extraReducers/setNodeValues'
import { deleteOriginalDataPoint } from './reducers/deleteOriginalDataPoint'
import { setNodeValueValidations } from './reducers/setNodeValueValidations'
import { DataState, TableDataStatus } from './stateType'

const initialState: DataState = {
  contacts: {},
  descriptions: {},
  nodeValueValidations: {},
  nodeValuesEstimations: {},
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
      const { assessmentName, cycleName, countryIso } = meta.arg

      // merge values at section level. good enough for now
      const valuePayload = payload[countryIso]
      const valueStore = state.descriptions?.[assessmentName]?.[cycleName]?.[countryIso]
      const path = ['descriptions', assessmentName, cycleName, countryIso]
      Objects.setInPath({ obj: state, path, value: { ...valueStore, ...valuePayload } })
    })

    builder.addCase(updateDescription.pending, (state, { meta }) => {
      const { assessmentName, cycleName, countryIso, sectionName, name, value } = meta.arg

      const path = ['descriptions', assessmentName, cycleName, countryIso, sectionName, name]
      Objects.setInPath({ obj: state, path, value })
    })

    builder.addCase(getLinkedDataSources.fulfilled, (state, { payload, meta }) => {
      const { dataSources, sectionName } = payload
      const { assessmentName, cycleName } = meta.arg

      const path = [assessmentName, cycleName, 'linkedDataSources', sectionName]
      Objects.setInPath({ obj: state, path, value: dataSources })
    })

    // contacts
    builder.addCase(createContact.fulfilled, (state, { payload, meta }) => {
      const { assessmentName, cycleName, countryIso } = meta.arg
      const contacts = state.contacts[assessmentName][cycleName][countryIso]
      const index = contacts.length - 1
      contacts.splice(index, 0, payload)
    })

    builder.addMatcher(isAnyOf(getContacts.fulfilled, updateContact.fulfilled), (state, { payload, meta }) => {
      const { assessmentName, cycleName, countryIso } = meta.arg
      const path = ['contacts', assessmentName, cycleName, countryIso]
      Objects.setInPath({ obj: state, path, value: payload })
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

  // Contacts
  createContact,
  getContacts,
  updateContact,
}

export default dataSlice.reducer as Reducer<DataState>
