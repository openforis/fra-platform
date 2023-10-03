import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { AreaCode } from 'meta/area'
import { AssessmentName, CycleName } from 'meta/assessment'

type Props = {
  assessmentName: AssessmentName
  cycleName: CycleName
  countryIso?: AreaCode
  path: string
}

type Returned = {
  total: number
}

export const getCount = createAsyncThunk<Returned, Props>('tablePaginated/count/get', async (props) => {
  const { assessmentName, cycleName, countryIso, path } = props

  const params: Record<string, string> = { assessmentName, cycleName }

  params.countryIso = countryIso

  const { data } = await axios.get<Returned>(`${path}/count`, { params })

  return data
})
