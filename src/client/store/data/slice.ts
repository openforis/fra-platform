import { createSlice, Reducer } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { ContactNode } from 'meta/cycleData'
import { RecordAssessmentDatas } from 'meta/data'

import { deleteContact } from 'client/store/data/actions/deleteContact'
import { getContacts } from 'client/store/data/actions/getContacts'
import { setNodeValues } from 'client/store/data/actions/setNodeValues'
import { upsertContact } from 'client/store/data/actions/upsertContact'
import { setNodeValuesReducer } from 'client/store/data/extraReducers/setNodeValues'
import { deleteOriginalDataPoint } from 'client/store/data/reducers/deleteOriginalDataPoint'
import { setNodeValueValidations } from 'client/store/data/reducers/setNodeValueValidations'

import { clearTableData } from './actions/clearTableData'
import { copyPreviousDatasources } from './actions/copyPreviousDatasources'
import { getDescription } from './actions/getDescription'
import { getLinkedDataSources } from './actions/getLinkedDataSources'
import { getNodeValuesEstimations } from './actions/getNodeValuesEstimations'
import { getODPLastUpdatedTimestamp } from './actions/getODPLastUpdatedTimestamp'
import { getTableData } from './actions/getTableData'
import { postEstimate } from './actions/postEstimate'
import { updateDescription } from './actions/updateDescription'
import { updateNodeValues } from './actions/updateNodeValues'
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
      const { assessmentName, cycleName, countryIso, tableNames } = meta.arg
      tableNames.forEach((tableName) => {
        const path = ['tableDataStatus', assessmentName, cycleName, countryIso, tableName]
        Objects.setInPath({ obj: state, path, value: TableDataStatus.fetching })
      })
    })
    builder.addCase(getTableData.fulfilled, (state, { meta, payload }) => {
      // update table data
      state.tableData = RecordAssessmentDatas.mergeData({
        tableData: state.tableData,
        newTableData: payload,
      })
      // update table data status
      const { assessmentName, cycleName, countryIso, tableNames } = meta.arg
      tableNames.forEach((tableName) => {
        const path = ['tableDataStatus', assessmentName, cycleName, countryIso, tableName]
        Objects.setInPath({ obj: state, path, value: TableDataStatus.fetched })
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
    builder.addCase(getContacts.fulfilled, (state, { payload, meta }) => {
      const { assessmentName, cycleName, countryIso } = meta.arg
      const path = ['contacts', assessmentName, cycleName, countryIso]
      Objects.setInPath({ obj: state, path, value: payload ?? [] })
    })
    builder.addCase(upsertContact.pending, (state, action) => {
      const { assessmentName, cycleName, countryIso, contact: contactAction, field, raw } = action.meta.arg

      const fieldUpdate: ContactNode = { ...contactAction[field], value: { raw } }
      const contactUpdate = { ...contactAction, [field]: fieldUpdate }

      const contacts = state.contacts[assessmentName][cycleName][countryIso]
      const contactIdx = contacts.findIndex((c) => c.uuid === contactAction.uuid)
      if (contactIdx >= 0) {
        contacts[contactIdx] = contactUpdate
      } else {
        contacts.push(contactUpdate)
      }
    })

    builder.addCase(deleteContact.pending, (state, action) => {
      const { assessmentName, cycleName, countryIso, uuid } = action.meta.arg

      const contacts = state.contacts[assessmentName][cycleName][countryIso]

      const path = ['contacts', assessmentName, cycleName, countryIso]
      const value = contacts.filter((c) => c.uuid !== uuid)
      Objects.setInPath({ obj: state, path, value })
    })

    builder.addCase(upsertContact.fulfilled, (state, action) => {
      const { assessmentName, cycleName, countryIso, contact: contactAction } = action.meta.arg

      const contacts = state.contacts[assessmentName][cycleName][countryIso]
      const contactIdx = contacts.findIndex((c) => c.uuid === contactAction.uuid)
      if (contactIdx >= 0) {
        contacts[contactIdx] = { ...contacts[contactIdx], placeholder: false }
      } else {
        throw new Error(`Contact not found`)
      }
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

  // Estimations
  postEstimate,

  // Descriptions
  getDescription,
  updateDescription,
  copyPreviousDatasources,
  getLinkedDataSources,

  // Contacts
  getContacts,
  upsertContact,
  deleteContact,
}

export default dataSlice.reducer as Reducer<DataState>
