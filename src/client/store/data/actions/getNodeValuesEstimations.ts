import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleDataParams } from 'meta/api/request'
import { NodeValuesEstimation } from 'meta/assessment'

export const getNodeValuesEstimations = createAsyncThunk<
  Record<string, NodeValuesEstimation>,
  CycleDataParams & { tableName: string }
>('section/get/estimations', async ({ assessmentName, countryIso, cycleName, tableName, sectionName }) => {
  const { data } = await axios.get(ApiEndPoint.CycleData.Table.nodeValuesEstimations(), {
    params: {
      assessmentName,
      countryIso,
      cycleName,
      tableName,
      sectionName,
    },
  })
  return data
})
