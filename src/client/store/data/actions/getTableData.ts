import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'
import { RecordAssessmentData } from 'meta/data'

export const getTableData = createAsyncThunk<
  RecordAssessmentData,
  CycleParams & { tableNames: Array<string>; mergeOdp?: boolean }
>('section/get/data', async ({ countryIso, assessmentName, cycleName, tableNames, mergeOdp = false }) => {
  const { data } = await axios.get(ApiEndPoint.CycleData.Table.tableData(), {
    params: {
      countryIso,
      assessmentName,
      cycleName,
      tableNames,
      countryISOs: [countryIso],
      mergeOdp,
    },
  })
  return data
})
