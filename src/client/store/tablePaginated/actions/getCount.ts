import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { TablePaginatedBaseParams } from 'meta/api/request/tablePaginated'
import { TablePaginatedFilterValues, TablePaginateds } from 'meta/tablePaginated'

type Props = TablePaginatedBaseParams & {
  filters?: Record<string, TablePaginatedFilterValues>
  path: string
}

type Returned = {
  total: number
}

export const getCount = createAsyncThunk<Returned, Props>('tablePaginated/count/get', async (props) => {
  const { assessmentName, countryIso, cycleName, filters, path, sectionName } = props

  const encodedFilters = TablePaginateds.encodeFilters(filters)

  const params: Record<string, string> = { assessmentName, countryIso, cycleName, filters: encodedFilters, sectionName }

  const { data } = await axios.get<Returned>(`${path}/count`, { params })

  return data
})
