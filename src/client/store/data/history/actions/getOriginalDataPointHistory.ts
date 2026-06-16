import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryParams } from 'meta/api/request/country'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { SectionName } from 'meta/assessment/section'

type Props = CountryParams & { sectionName: SectionName; year: string }

type Returned = OriginalDataPoint

export const getOriginalDataPointHistory = createAsyncThunk<Returned, Props>(
  'data/history/originalDataPoint/get',
  async ({ assessmentName, countryIso, cycleName, sectionName, year }) => {
    const { data } = await axios.get(ApiEndPoint.CycleData.NationalDataPoint.history(), {
      params: {
        assessmentName,
        countryIso,
        cycleName,
        sectionName,
        year,
      },
    })

    return data
  }
)
