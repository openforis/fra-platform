import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { TablePaginatedOrderBy } from 'meta/tablePaginated'

import { getCount } from 'client/store/ui/tablePaginated/actions/getCount'
import { getData } from 'client/store/ui/tablePaginated/actions/getData'
import { initialState } from 'client/store/ui/tablePaginated/state'

export const TablePaginatedSlice = createSlice({
  name: 'tablePaginated',
  initialState,
  reducers: {
    setOrderBy: (state, action: PayloadAction<{ orderBy: TablePaginatedOrderBy; path: string }>) => {
      const { orderBy, path } = action.payload
      Objects.setInPath({ obj: state, path: [path, 'orderBy'], value: orderBy })
      Objects.setInPath({ obj: state, path: [path, 'page'], value: 0 })
    },
    setPage: (state, action) => {
      const { path, page } = action.payload
      Objects.setInPath({ obj: state, path: [path, 'page'], value: page })
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCount.fulfilled, (state, action) => {
      const { path } = action.meta.arg
      const count = action.payload
      Objects.setInPath({ obj: state, path: [path, 'count'], value: count })
    })

    builder.addCase(getData.pending, (state, action) => {
      const { path } = action.meta.arg
      Objects.setInPath({ obj: state, path: [path, 'data'], value: undefined })
    })

    builder.addCase(getData.fulfilled, (state, action) => {
      const { path } = action.meta.arg
      const data = action.payload
      Objects.setInPath({ obj: state, path: [path, 'data'], value: data })
    })
  },
})
