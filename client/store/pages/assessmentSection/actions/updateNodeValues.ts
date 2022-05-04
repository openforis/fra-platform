import { ApiEndPoint } from '@common/api/endpoint'
import { Functions } from '@core/utils'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CountryIso } from '@meta/area'
import { AssessmentName, NodeValue } from '@meta/assessment'

export type ValueUpdate = {
  variableName: string
  colName: string
  value: NodeValue
}

export type Params = {
  assessmentName: AssessmentName
  cycleName: string
  sectionName: string
  countryIso: CountryIso
  tableName: string
  values: Array<ValueUpdate>
}

const patchNodeValues = Functions.debounce(async (params: Params) => {
  try {
    await axios.patch(ApiEndPoint.CycleData.Nodes.many(), params)
  } catch (e) {
    // placeholder to avoid app crash
  }
}, 250)

export const updateNodeValues = createAsyncThunk<void, Params>('section/nodeValues/update', (params) => {
  patchNodeValues(params)
})
