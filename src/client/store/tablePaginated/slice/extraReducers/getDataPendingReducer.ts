import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { getData } from 'client/store/tablePaginated/actions/getData'
import { TablePaginatedState } from 'client/store/tablePaginated/state'

const getDataPendingReducer = (builder: ActionReducerMapBuilder<TablePaginatedState>): void => {
  builder.addCase(getData.pending, (state, action) => {
    const { path } = action.meta.arg
    Objects.setInPath({ obj: state, path: [path, 'data'], value: undefined })
  })
}

export default getDataPendingReducer
