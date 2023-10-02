import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { TablePaginatedDataRequestParams } from 'meta/api/request/tablePaginated'
import { CountryIso } from 'meta/area'
import { AssessmentName, CycleName } from 'meta/assessment'
import { TablePaginatedOrderBy } from 'meta/tablePaginated'

import { limit as defaultLimit } from 'client/store/ui/tablePaginated/constants'

type Props = {
  assessmentName: AssessmentName
  cycleName: CycleName
  countryIso?: CountryIso
  orderBy?: TablePaginatedOrderBy
  page: number
  path: string
  limit: number
}

type Returned = Array<any>

export const getData = createAsyncThunk<Returned, Props>('tablePaginated/data/get', async (props) => {
  const { assessmentName, cycleName, countryIso, orderBy, page, path, limit: _limit } = props

  const limit = _limit ?? defaultLimit

  const params: TablePaginatedDataRequestParams = {
    assessmentName,
    cycleName,
    limit: String(limit),
    offset: String(page * limit),
  }

  if (orderBy && orderBy.property && orderBy.direction) {
    params.orderBy = orderBy.property
    params.orderByDirection = orderBy.direction
  }

  if (countryIso) {
    params.countryIso = countryIso
  }

  const { data } = await axios.get<Returned>(path, { params })

  return data
})
