import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { RecordAssessmentData } from 'meta/data'

import { Props } from 'client/store/data/actions/getTableDataProps'

export const getTableData = createAsyncThunk<RecordAssessmentData, Props>('data/tableData/get', async (props) => {
  const { assessmentName, auth, countryISOs, countryIso, cycleName, mergeOdp = false, regionCode, tableNames } = props

  const authContext = auth ? encodeURIComponent(JSON.stringify(auth)) : undefined
  const params = {
    assessmentName,
    countryIso,
    cycleName,
    tableNames,
    regionCode,
    countryISOs: countryISOs ?? [countryIso],
    mergeOdp,
    authContext,
  }
  const { data } = await axios.get(ApiEndPoint.CycleData.Table.tableData(), { params })

  return data
})
