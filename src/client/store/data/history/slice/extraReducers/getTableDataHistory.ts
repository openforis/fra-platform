import { ActionReducerMapBuilder, createSelector } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { RecordAssessmentDatas } from 'meta/data'

import { getTableDataHistory } from 'client/store/data/history/actions/getTableDataHistory'
import { HistoryState } from 'client/store/data/history/state'

const _getTableData = createSelector(
  (state: HistoryState) => state,
  (history) => history.lastApproved.tableData
)

export const getTableDataHistoryReducer = (builder: ActionReducerMapBuilder<HistoryState>) =>
  builder.addCase(getTableDataHistory.fulfilled, (state, { payload }) => {
    const tableData = _getTableData(state) ?? {}
    const value = RecordAssessmentDatas.mergeData({ tableData, newTableData: payload })

    const path = ['lastApproved', 'tableData']
    Objects.setInPath({ obj: state, path, value })
  })
