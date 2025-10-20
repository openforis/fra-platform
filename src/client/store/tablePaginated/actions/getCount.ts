import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { TablePaginatedBaseParams } from 'meta/api/request/tablePaginated'
import { TablePaginatedFilterValues, TablePaginateds } from 'meta/tablePaginated'

type Props = Omit<TablePaginatedBaseParams, 'filters'> & {
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

  const [basePath, queryString] = path.split(/\?(.+)/)
  let querySuffix = ''
  if (queryString) querySuffix = `?${queryString}`
  const countPath = `${basePath}/count${querySuffix}`

  const { data } = await axios.get<Returned>(countPath, { params })

  return data
})
