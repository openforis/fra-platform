import { createAsyncThunk } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { TablePaginatedBaseParams } from 'meta/api/request/tablePaginated'

import { getCount } from 'client/store/tablePaginated/actions/getCount'
import { getData } from 'client/store/tablePaginated/actions/getData'
import { ThunkApiConfig } from 'client/store/types'

import { TablePaginatedSelectors } from '../selectors'

type Props = Omit<TablePaginatedBaseParams, 'filters'> & {
  limit: number
  path: string
}

// Refetch data with the current sorting/order settings
export const refetchData = createAsyncThunk<void, Props, ThunkApiConfig>(
  'tablePaginated/data/refetch',
  async (props, { dispatch, getState }) => {
    const { limit, path, ...baseParams } = props

    const state = getState()
    const tableState = TablePaginatedSelectors.getPathState(state, path)
    if (Objects.isEmpty(tableState)) return

    const { filters, orderBy, page } = tableState
    const currentPage = page ?? 0

    const sharedParams = {
      ...baseParams,
      path,
      filters,
    }

    dispatch(getData({ ...sharedParams, limit, orderBy, page: currentPage }))
    dispatch(getCount(sharedParams))
  }
)
