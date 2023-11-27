import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'
import { CountryIso } from 'meta/area'
import { AssessmentFile } from 'meta/cycleData'

type Params = CycleParams & {
  fileCountryIso?: CountryIso
  files: Array<AssessmentFile>
  public: boolean
}

export const updateAccess = createAsyncThunk<Array<AssessmentFile>, Params>(
  'assessmentFiles/put/updateAccess',
  async (params) => {
    const { countryIso, assessmentName, cycleName, files, public: _public } = params

    const UUIDs = files.map((f) => f.uuid)
    const data = { public: _public, UUIDs }
    const config = { params: { countryIso, assessmentName, cycleName } }
    const { data: assessmentFiles } = await axios.put(ApiEndPoint.File.Assessment.updateAccess(), data, config)
    return assessmentFiles
  }
)
