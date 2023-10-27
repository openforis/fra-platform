import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'
import { RecordAssessmentData } from 'meta/data'

type Props = CycleParams & {
  tableNames: Array<string>
}

export const getTableData = createAsyncThunk<RecordAssessmentData, Props>('data/tableData/get', async (props) => {
  const { countryIso, assessmentName, cycleName, tableNames } = props

  const params = { assessmentName, countryIso, cycleName, tableNames, countryISOs: [countryIso], mergeOdp: false }
  const { data } = await axios.get(ApiEndPoint.CycleData.Table.tableData(), { params })

  return data
})
