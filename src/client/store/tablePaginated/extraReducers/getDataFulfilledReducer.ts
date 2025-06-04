import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { getData } from '../actions/getData'
import { TablePaginatedState } from '../state'

const getDataFulfilledReducer = (builder: ActionReducerMapBuilder<TablePaginatedState>) => {
  builder.addCase(getData.fulfilled, (state, action) => {
    const { path } = action.meta.arg
    const data = action.payload
    Objects.setInPath({ obj: state, path: [path, 'data'], value: data })
  })
}

export default getDataFulfilledReducer
