import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryParams } from 'meta/api/request/country'
import { CountryIso } from 'meta/area/countryIso'
import { ODPs } from 'meta/assessment/odps'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

type Props = CountryParams & {
  countryIso: CountryIso
  index: number
  originalDataPoint: OriginalDataPoint
}

export const deleteOriginalDataPointNationalClass = createAsyncThunk<OriginalDataPoint, Props>(
  'data/originalDataPoint/nationalClasses/delete',
  async (props) => {
    const { assessmentName, countryIso, cycleName, index, originalDataPoint } = props
    const { id: odpId } = originalDataPoint

    const sectionName = 'extentOfForest'
    const params = { assessmentName, cycleName, countryIso, index, sectionName, odpId }
    await axios.delete(ApiEndPoint.CycleData.NationalDataPoint.nationalClass(), { params })
    return ODPs.deleteNationalClass({ odp: originalDataPoint, index: props.index })
  }
)
