import { ActionReducerMapBuilder, createSelector } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { RecordAssessmentDatas } from 'meta/data'

import { getTableDataHistory } from 'client/store/data/actions/getTableDataHistory'
import { DataState } from 'client/store/data/state'

const _getTableData = createSelector(
  (state: DataState) => state.history,
  (history) => history.lastApproved.tableData
)

export const getTableDataHistoryReducer = (builder: ActionReducerMapBuilder<DataState>) =>
  builder.addCase(getTableDataHistory.fulfilled, (state, { payload }) => {
    const path = ['history', 'lastApproved', 'tableData']
    const tableData = _getTableData(state) ?? {}
    const value = RecordAssessmentDatas.mergeData({ tableData, newTableData: payload })
    Objects.setInPath({ obj: state, path, value })
  })
