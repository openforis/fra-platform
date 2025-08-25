import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { getCount } from 'client/store/tablePaginated/actions/getCount'
import { TablePaginatedState } from 'client/store/tablePaginated/state'

const getCountReducer = (builder: ActionReducerMapBuilder<TablePaginatedState>): void => {
  builder.addCase(getCount.fulfilled, (state, action) => {
    const { path } = action.meta.arg
    const count = action.payload
    Objects.setInPath({ obj: state, path: [path, 'count'], value: count })
  })
}

export default getCountReducer
