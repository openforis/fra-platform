import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { getData } from 'client/store/tablePaginated/actions/getData'
import { TablePaginatedState } from 'client/store/tablePaginated/state'

const getDataFulfilledReducer = (builder: ActionReducerMapBuilder<TablePaginatedState>): void => {
  builder.addCase(getData.fulfilled, (state, action) => {
    const { path } = action.meta.arg
    const data = action.payload
    Objects.setInPath({ obj: state, path: [path, 'data'], value: data })
  })
}

export default getDataFulfilledReducer
