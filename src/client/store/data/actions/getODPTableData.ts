import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area'
import { RecordAssessmentData } from 'meta/data'

type Params = {
  assessmentName: string
  countryIso: CountryIso
  cycleName: string
}

export const getODPTableData = createAsyncThunk<RecordAssessmentData, Params>(
  'data/odp/tableData/get',
  async (params) => {
    const { data } = await axios.get(ApiEndPoint.CycleData.OriginalDataPoint.data(), { params })
    return data
  }
)
