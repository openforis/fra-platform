import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { TablePaginatedBaseParams, TablePaginatedDataRequestParams } from 'meta/api/request/tablePaginated'
import { TablePaginatedFilterValues, TablePaginatedOrderBy, TablePaginateds } from 'meta/tablePaginated'

type Props = TablePaginatedBaseParams & {
  filters?: Record<string, TablePaginatedFilterValues>
  limit: number
  orderBy?: TablePaginatedOrderBy
  page: number
  params: Record<string, unknown>
  path: string
}

type Returned = Array<never>

export const getData = createAsyncThunk<Returned, Props>('tablePaginated/data/get', async (props) => {
  const {
    assessmentName,
    countryIso,
    cycleName,
    filters,
    limit,
    orderBy,
    page,
    params: paramsProp,
    path,
    sectionName,
  } = props

  const encodedFilters = TablePaginateds.encodeFilters(filters)

  const params: TablePaginatedDataRequestParams = {
    ...paramsProp,
    assessmentName,
    countryIso,
    cycleName,
    filters: encodedFilters,
    limit: String(limit),
    offset: String(page * limit),
    sectionName,
  }

  if (orderBy && orderBy.property && orderBy.direction) {
    params.orderBy = orderBy.property
    params.orderByDirection = orderBy.direction
  }

  const { data } = await axios.get<Returned>(path, { params })

  return data
})
