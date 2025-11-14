import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { TableNames } from 'meta/assessment/table'
import { RecordAssessmentDatas } from 'meta/data/recordDatas'

import { removeOriginalDataPoint } from 'client/store/data/tableData/nodeValues/actions/removeOriginalDataPoint'
import { NodeValuesState } from 'client/store/data/tableData/nodeValues/state'

export const removeOriginalDataPointReducer = (builder: ActionReducerMapBuilder<NodeValuesState>): void => {
  builder.addCase(removeOriginalDataPoint, (state, action) => {
    // Delete reference from state for deleted ODP
    const { assessmentName, countryIso, cycleName, year } = action.payload

    const odpReference = RecordAssessmentDatas.getTableData({
      data: state,
      assessmentName,
      cycleName,
      countryIso,
      tableName: TableNames.originalDataPointValue,
    })[year]

    if (odpReference) {
      delete state[assessmentName][cycleName][countryIso][TableNames.originalDataPointValue][year]
    }
  })
}
