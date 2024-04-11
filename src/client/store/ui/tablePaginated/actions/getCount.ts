import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { AreaCode } from 'meta/area'
import { AssessmentName, CycleName, SectionName } from 'meta/assessment'

type Props = {
  assessmentName: AssessmentName
  cycleName: CycleName
  countryIso?: AreaCode
  sectionName?: SectionName
  path: string
}

type Returned = {
  total: number
}

export const getCount = createAsyncThunk<Returned, Props>('tablePaginated/count/get', async (props) => {
  const { assessmentName, cycleName, countryIso, sectionName, path } = props

  const params: Record<string, string> = { assessmentName, cycleName, countryIso, sectionName }

  const { data } = await axios.get<Returned>(`${path}/count`, { params })

  return data
})
