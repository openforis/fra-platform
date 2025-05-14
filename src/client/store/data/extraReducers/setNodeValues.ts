import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { RecordAssessmentDatas } from 'meta/data'

import { setNodeValues } from 'client/store/data/actions/setNodeValues'
import { DataState } from 'client/store/data/state'

export const setNodeValuesReducer = (builder: ActionReducerMapBuilder<DataState>) =>
  builder.addCase(setNodeValues, (state, action) => {
    const { nodeUpdates } = action.payload
    const { assessmentName, countryIso, cycleName, nodes } = nodeUpdates

    nodes.forEach(({ colName, tableName, value, variableName }) => {
      const data = state.tableData
      const props = { assessmentName, cycleName, countryIso, tableName, variableName, colName, data, value }
      state.tableData = RecordAssessmentDatas.updateDatum(props)
    })
  })
