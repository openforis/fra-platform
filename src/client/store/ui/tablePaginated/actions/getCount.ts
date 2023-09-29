import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { AssessmentName, CycleName } from 'meta/assessment'

type Props = {
  assessmentName: AssessmentName
  cycleName: CycleName
  path: string
  params?: Record<string, string>
}

type Returned = {
  total: number
}

export const getCount = createAsyncThunk<Returned, Props>('tablePaginated/count/get', async (props) => {
  const { assessmentName, cycleName, path, params: _params = {} } = props

  const params = { assessmentName, cycleName, ..._params }

  const { data } = await axios.get<Returned>(`${path}/count`, { params })

  return data
})
