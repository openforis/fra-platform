import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryParams } from 'meta/api/request/country'
import { ODPs } from 'meta/assessment/odps'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

type Props = CountryParams & { year: number; targetYear: number }

export const copyNationalClasses = createAsyncThunk<OriginalDataPoint, Props>(
  'data/originalDataPoint/nationalClasses/copy',
  async (props: Props) => {
    const { assessmentName, countryIso, cycleName, targetYear, year } = props

    const params = { countryIso, assessmentName, cycleName, sectionName: 'extentOfForest', year }
    const config = { params }
    const data = { targetYear }
    const { data: originalDataPoint } = await axios.put(
      ApiEndPoint.CycleData.NationalDataPoint.copyNationalClasses(),
      data,
      config
    )

    return ODPs.addNationalClassPlaceHolder(originalDataPoint)
  }
)
