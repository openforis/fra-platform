import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from '@meta/api/endpoint'
import { CycleParams } from '@meta/api/request'
import { NodeValuesEstimation } from '@meta/assessment'

export const getTableEstimations = createAsyncThunk<
  Record<string, NodeValuesEstimation>,
  CycleParams & { tableName: string }
>('section/get/estimations', async ({ assessmentName, countryIso, cycleName, tableName }) => {
  const { data } = await axios.get(ApiEndPoint.CycleData.Table.tableEstimations(), {
    params: {
      assessmentName,
      countryIso,
      cycleName,
      tableName,
    },
  })
  return data
})
