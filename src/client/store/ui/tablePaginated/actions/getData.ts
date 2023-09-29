import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { TablePaginatedDataRequestParams } from 'meta/api/request/tablePaginated'
import { AssessmentName, CycleName } from 'meta/assessment'
import { TablePaginatedOrderBy } from 'meta/tablePaginated'

import { limit } from 'client/store/ui/tablePaginated/constants'

type Props = {
  assessmentName: AssessmentName
  cycleName: CycleName
  orderBy?: TablePaginatedOrderBy
  page: number
  path: string
  params?: Record<string, string>
}

type Returned = Array<any>

export const getData = createAsyncThunk<Returned, Props>('tablePaginated/data/get', async (props) => {
  const { assessmentName, cycleName, orderBy, page, path, params: _params = {} } = props

  const params: TablePaginatedDataRequestParams = {
    assessmentName,
    cycleName,
    limit: String(limit),
    offset: String(page * limit),
    ..._params,
  }

  if (orderBy && orderBy.property && orderBy.direction) {
    params.orderBy = orderBy.property
    params.orderByDirection = orderBy.direction
  }

  const { data } = await axios.get<Returned>(path, { params })

  return data
})
