import { ActionReducerMapBuilder, createSlice, Reducer } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { RecordAssessmentDatas } from 'meta/data'

import { getTableDataHistoryReducer } from 'client/store/data/extraReducers/getTableDataHistory'
import { DataState, TableDataStatus } from 'client/store/data/state'

import { getLinkedDataSources } from './actions/getLinkedDataSources'
import { getODPLastUpdatedTimestamp } from './actions/getODPLastUpdatedTimestamp'
import { getTableData } from './actions/getTableData'
import { updateNodeValues } from './actions/updateNodeValues'
import { getDescriptionsHistoryReducer } from './extraReducers/getDescriptionsHistory'
import { getOriginalDataPointHistoryReducer } from './extraReducers/getOriginalDataPointHistory'
import { setNodeValuesReducer } from './extraReducers/setNodeValues'
import { deleteOriginalDataPoint } from './reducers/deleteOriginalDataPoint'
import { resetHistoryActivities } from './reducers/resetHistoryActivities'
import { setNodeValueValidations } from './reducers/setNodeValueValidations'
import { setValue } from './reducers/setValue'
import { toggleHistoryActivities } from './reducers/toggleHistoryActivities'
import { toggleHistoryActivitiesCompareItem } from './reducers/toggleHistoryActivitiesCompareItem'
import { toggleHistoryLastApproved } from './reducers/toggleHistoryLastApproved'

const initialState: DataState = {
  history: {},
  nodeValueValidations: {},
  nodeValuesEstimations: {},
  odpLastUpdatedTimestamp: {},
  tableData: {},
  tableDataStatus: {},
}

export const DataDeprecatedSlice = createSlice({
  name: 'dataDep',
  initialState,
  reducers: {
    deleteOriginalDataPoint,
    setNodeValueValidations,
    setValue,
    // -- history activities
    toggleHistoryActivitiesCompareItem,
    resetHistoryActivities,
    toggleHistoryActivities,
    // -- history last approved
    toggleHistoryLastApproved,
  },

  extraReducers: (builder: ActionReducerMapBuilder<DataState>) => {
    setNodeValuesReducer(builder)

    // Table data
    builder.addCase(getTableData.pending, (state, { meta }) => {
      const { assessmentName, countryIso, cycleName, tableNames } = meta.arg
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
      const { assessmentName, countryIso, cycleName, tableNames } = meta.arg
      tableNames.forEach((tableName) => {
        const path = ['tableDataStatus', assessmentName, cycleName, countryIso, tableName]
        Objects.setInPath({ obj: state, path, value: TableDataStatus.fetched })
      })
    })

    builder.addCase(updateNodeValues.pending, (state, { meta }) => {
      const { assessmentName, countryIso, cycleName, tableName, values } = meta.arg
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

    builder.addCase(getLinkedDataSources.fulfilled, (state, { meta, payload }) => {
      const { dataSources, sectionName } = payload
      const { assessmentName, cycleName } = meta.arg

      const path = [assessmentName, cycleName, 'linkedDataSources', sectionName]
      Objects.setInPath({ obj: state, path, value: dataSources })
    })

    // == History reducers
    getDescriptionsHistoryReducer(builder)
    getTableDataHistoryReducer(builder)
    getOriginalDataPointHistoryReducer(builder)
  },
})

export default DataDeprecatedSlice.reducer as Reducer<DataState>
