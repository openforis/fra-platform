import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { TablePaginatedDataRequestParams } from 'meta/api/request/tablePaginated'
import { AreaCode } from 'meta/area'
import { AssessmentName, CycleName, SectionName } from 'meta/assessment'
import { TablePaginatedFilterValues, TablePaginatedOrderBy, TablePaginateds } from 'meta/tablePaginated'

type Props = {
  assessmentName: AssessmentName
  countryIso?: AreaCode
  cycleName: CycleName
  filters?: Record<string, TablePaginatedFilterValues>
  limit: number
  orderBy?: TablePaginatedOrderBy
  page: number
  path: string
  sectionName?: SectionName
}

type Returned = Array<never>

export const getData = createAsyncThunk<Returned, Props>('tablePaginated/data/get', async (props) => {
  const { assessmentName, countryIso, cycleName, filters, limit, orderBy, page, path, sectionName } = props

  const encodedFilters = TablePaginateds.encodeFilters(filters)

  const params: TablePaginatedDataRequestParams = {
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
