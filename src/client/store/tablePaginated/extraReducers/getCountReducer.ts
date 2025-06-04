import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { getCount } from '../actions/getCount'
import { TablePaginatedState } from '../state'

const getCountReducer = (builder: ActionReducerMapBuilder<TablePaginatedState>) => {
  builder.addCase(getCount.fulfilled, (state, action) => {
    const { path } = action.meta.arg
    const count = action.payload
    Objects.setInPath({ obj: state, path: [path, 'count'], value: count })
  })
}

export default getCountReducer
