import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { RecordAssessmentDatas } from 'meta/data'

import { setNodeValues } from 'client/store/data/actions/setNodeValues'
import { DataState } from 'client/store/data/stateType'

export const setNodeValuesReducer = (builder: ActionReducerMapBuilder<DataState>) =>
  builder.addCase(setNodeValues, (state, action) => {
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
  })
