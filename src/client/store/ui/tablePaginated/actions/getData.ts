import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { AssessmentName, CycleName } from 'meta/assessment'

import { limit } from 'client/store/ui/tablePaginated/constants'

type Props = {
  assessmentName: AssessmentName
  cycleName: CycleName
  page: number
  path: string
}

type Returned = Array<any>

export const getData = createAsyncThunk<Returned, Props>('tablePaginated/data/get', async (props) => {
  const { assessmentName, cycleName, page, path } = props

  const params = { assessmentName, cycleName, limit, page }

  const { data } = await axios.get<Returned>(path, { params })

  return data
})
