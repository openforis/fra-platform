import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { getTableDataHistory } from 'client/store/data/actions/getTableDataHistory'
import { DataState } from 'client/store/data/state'

export const getTableDataHistoryReducer = (builder: ActionReducerMapBuilder<DataState>) =>
  builder.addCase(getTableDataHistory.fulfilled, (state, { payload: value }) => {
    const path = ['history', 'lastApproved', 'tableData']
    Objects.setInPath({ obj: state, path, value })
  })
