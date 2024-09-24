import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'
import { CountryIso } from 'meta/area'
import { AssessmentName, CycleName } from 'meta/assessment'
import { RecordAssessmentData } from 'meta/data'

type Props = CycleParams & {
  auth?: { assessmentName: AssessmentName; cycleName: CycleName }
  mergeOdp?: boolean
  tableNames: Array<string>
  countryISOs?: Array<CountryIso>
}

export const getTableData = createAsyncThunk<RecordAssessmentData, Props>('data/tableData/get', async (props) => {
  const { assessmentName, auth, countryIso, countryISOs, cycleName, mergeOdp = false, tableNames } = props

  const authContext = auth ? encodeURIComponent(JSON.stringify(auth)) : undefined
  const params = {
    assessmentName,
    countryIso,
    cycleName,
    tableNames,
    countryISOs: countryISOs ?? [countryIso],
    mergeOdp,
    authContext,
  }
  const { data } = await axios.get(ApiEndPoint.CycleData.Table.tableData(), { params })

  return data
})
