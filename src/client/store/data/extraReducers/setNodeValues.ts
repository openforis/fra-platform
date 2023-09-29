import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { RecordAssessmentDatas } from 'meta/data'

import { setNodeValues } from 'client/store/data/actions/setNodeValues'
import { DataState } from 'client/store/data/stateType'

export const setNodeValuesReducer = (builder: ActionReducerMapBuilder<DataState>) =>
  builder.addCase(setNodeValues, (state, action) => {
    const { nodeUpdates } = action.payload
    const { countryIso, nodes, assessmentName, cycleName } = nodeUpdates

    nodes.forEach(({ tableName, variableName, colName, value }) => {
      const data = state.tableData
      const props = { assessmentName, cycleName, countryIso, tableName, variableName, colName, data, value }
      state.tableData = RecordAssessmentDatas.updateDatum(props)
    })
  })
