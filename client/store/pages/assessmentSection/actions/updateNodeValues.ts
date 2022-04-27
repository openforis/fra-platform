import { ApiEndPoint } from '@common/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CountryIso } from '@meta/area'
import { AssessmentName, NodeValue } from '@meta/assessment'

export type ValueUpdate = {
  variableName: string
  colName: string
  value: NodeValue
}

type Params = {
  assessmentName: AssessmentName
  cycleName: string
  sectionName: string
  countryIso: CountryIso
  tableName: string
  values: Array<ValueUpdate>
}

export const updateNodeValues = createAsyncThunk<void, Params>('section/nodeValues/update', async (params) => {
  await axios.patch(ApiEndPoint.CycleData.PersistNode.many(), params)
  // return params
})
