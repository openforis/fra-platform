import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { RecordAssessmentDatas } from 'meta/data'

import { setNodeValues } from 'client/store/data/tableData/nodeValues/actions/setNodeValues'
import { updateNodeValues } from 'client/store/data/tableData/nodeValues/actions/updateNodeValues'
import { NodeValuesState } from 'client/store/data/tableData/nodeValues/state'

export const nodeValuesReducer = (builder: ActionReducerMapBuilder<NodeValuesState>) => {
  builder.addCase(setNodeValues, (state, action) => {
    const { nodeUpdates } = action.payload
    const { assessmentName, countryIso, cycleName, nodes } = nodeUpdates

    nodes.forEach(({ colName, tableName, value, variableName }) => {
      const data = state
      const props = { assessmentName, cycleName, countryIso, tableName, variableName, colName, data, value }
      RecordAssessmentDatas.updateDatum(props)
    })
  })

  builder.addCase(updateNodeValues.pending, (state, { meta }) => {
    const { assessmentName, countryIso, cycleName, tableName, values } = meta.arg

    values.forEach((valueUpdate) => {
      const { colName, value, variableName } = valueUpdate

      RecordAssessmentDatas.updateDatum({
        assessmentName,
        cycleName,
        colName,
        countryIso,
        tableName,
        data: state,
        variableName,
        value,
      })
    })
  })
}
