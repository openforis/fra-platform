import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryParams } from 'meta/api/request/country'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { SectionNames } from 'meta/assessment/section'

export const deleteOriginalDataPoint = createAsyncThunk<void, CountryParams & { originalDataPoint: OriginalDataPoint }>(
  'data/originalDataPoint/delete',
  async ({ assessmentName, countryIso, cycleName, originalDataPoint: { year } }) => {
    const sectionName = SectionNames.extentOfForest
    await axios.delete(ApiEndPoint.CycleData.NationalDataPoint.one(), {
      params: { assessmentName, cycleName, countryIso, sectionName, year },
    })
  }
)
