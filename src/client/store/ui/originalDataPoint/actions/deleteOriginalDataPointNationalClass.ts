import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'
import { CountryIso } from 'meta/area'
import { ODPs, OriginalDataPoint } from 'meta/assessment'

type Props = CycleParams & {
  countryIso: CountryIso
  index: number
  originalDataPoint: OriginalDataPoint
}

export const deleteOriginalDataPointNationalClass = createAsyncThunk<OriginalDataPoint, Props>(
  'originalDataPoint/nationalClasses/delete',
  async (props) => {
    const { assessmentName, cycleName, countryIso, index, originalDataPoint } = props
    const { id: odpId } = originalDataPoint

    const sectionName = 'extentOfForest'
    const params = { assessmentName, cycleName, countryIso, index, sectionName, odpId }
    await axios.delete(ApiEndPoint.CycleData.OriginalDataPoint.nationalClass(), { params })
    return ODPs.deleteNationalClass({ odp: originalDataPoint, index: props.index })
  }
)
