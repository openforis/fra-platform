import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { NodeValuesActions } from 'client/store/data/tableData/nodeValues/actions'
import { TableDataStatus, TableDataStatusState } from 'client/store/data/tableData/status/state'

export const getTableDataReducer = (builder: ActionReducerMapBuilder<TableDataStatusState>) => {
  builder.addCase(NodeValuesActions.getTableData.pending, (state, { meta }) => {
    const { assessmentName, countryIso, cycleName, tableNames } = meta.arg
    tableNames.forEach((tableName) => {
      const path = [assessmentName, cycleName, countryIso, tableName]
      Objects.setInPath({ obj: state, path, value: TableDataStatus.fetching })
    })
  })

  builder.addCase(NodeValuesActions.getTableData.fulfilled, (state, { meta }) => {
    const { assessmentName, countryIso, cycleName, tableNames } = meta.arg
    tableNames.forEach((tableName) => {
      const path = [assessmentName, cycleName, countryIso, tableName]
      Objects.setInPath({ obj: state, path, value: TableDataStatus.fetched })
    })
  })
}
