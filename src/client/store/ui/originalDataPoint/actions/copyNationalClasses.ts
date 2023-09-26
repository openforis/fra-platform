import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'
import { ODPs, OriginalDataPoint } from 'meta/assessment'

type Props = CycleParams & { year: number; targetYear: number }

export const copyNationalClasses = createAsyncThunk<OriginalDataPoint, Props>(
  'originalDataPoint/nationalClasses/copy',
  async (props: Props) => {
    const { countryIso, assessmentName, cycleName, year, targetYear } = props

    const params = { countryIso, assessmentName, cycleName, sectionName: 'extentOfForest', year }
    const config = { params }
    const data = { targetYear }
    const { data: originalDataPoint } = await axios.put(
      ApiEndPoint.CycleData.OriginalDataPoint.copyNationalClasses(),
      data,
      config
    )

    return ODPs.addNationalClassPlaceHolder(originalDataPoint)
  }
)
