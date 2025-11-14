import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { RecordAssessmentDatas } from 'meta/data/recordDatas'

import { getTableData } from 'client/store/data/tableData/nodeValues/actions/getTableData'
import { NodeValuesState } from 'client/store/data/tableData/nodeValues/state'

export const tableDataReducer = (builder: ActionReducerMapBuilder<NodeValuesState>): void => {
  builder.addCase(getTableData.fulfilled, (state, { payload }) => {
    return RecordAssessmentDatas.mergeData({ tableData: state, newTableData: payload })
  })
}
