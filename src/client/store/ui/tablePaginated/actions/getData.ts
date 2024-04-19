import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { TablePaginatedDataRequestParams } from 'meta/api/request/tablePaginated'
import { AreaCode } from 'meta/area'
import { AssessmentName, CycleName, SectionName } from 'meta/assessment'
import { TablePaginatedOrderBy } from 'meta/tablePaginated'

type Props = {
  assessmentName: AssessmentName
  cycleName: CycleName
  countryIso?: AreaCode
  sectionName?: SectionName
  orderBy?: TablePaginatedOrderBy
  page: number
  path: string
  limit: number
}

type Returned = Array<never>

export const getData = createAsyncThunk<Returned, Props>('tablePaginated/data/get', async (props) => {
  const { assessmentName, cycleName, countryIso, sectionName, orderBy, page, path, limit } = props

  const params: TablePaginatedDataRequestParams = {
    assessmentName,
    cycleName,
    countryIso,
    sectionName,
    limit: String(limit),
    offset: String(page * limit),
  }

  if (orderBy && orderBy.property && orderBy.direction) {
    params.orderBy = orderBy.property
    params.orderByDirection = orderBy.direction
  }

  const { data } = await axios.get<Returned>(path, { params })

  return data
})
