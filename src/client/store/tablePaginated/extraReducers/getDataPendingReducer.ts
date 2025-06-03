import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { getData } from '../actions/getData'
import { TablePaginatedState } from '../state'

const getDataPendingReducer = (builder: ActionReducerMapBuilder<TablePaginatedState>) => {
  builder.addCase(getData.pending, (state, action) => {
    const { path } = action.meta.arg
    Objects.setInPath({ obj: state, path: [path, 'data'], value: undefined })
  })
}

export default getDataPendingReducer
