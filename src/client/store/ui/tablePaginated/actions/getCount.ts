import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { AssessmentName, CycleName } from 'meta/assessment'

type Props = {
  assessmentName: AssessmentName
  cycleName: CycleName
  path: string
}

type Returned = {
  total: number
}

export const getCount = createAsyncThunk<Returned, Props>('tablePaginated/count/get', async (props) => {
  const { assessmentName, cycleName, path } = props

  const params = { assessmentName, cycleName }

  const { data } = await axios.get<Returned>(`${path}/count`, { params })

  return data
})
