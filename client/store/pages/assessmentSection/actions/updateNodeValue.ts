import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from '@common/api/endpoint'
import { Functions } from '@core/utils'
import { AssessmentName, NodeValue } from '@meta/assessment'
import { CountryIso } from '@meta/area'

type Params = {
  assessmentName: AssessmentName
  countryIso: CountryIso
  colName: string
  cycleName: string
  sectionName: string
  tableName: string
  variableName: string
  value: NodeValue
}

const patchNodeValue = Functions.debounce(async (params: Params) => {
  const { value, ...rest } = params
  await axios.patch(ApiEndPoint.CycleData.PersistNode.one(), value, { params: rest })
}, 250)

export const updateNodeValue = createAsyncThunk<Params, Params>('section/nodeValue/update', async (params) => {
  patchNodeValue(params)
  return params
})
