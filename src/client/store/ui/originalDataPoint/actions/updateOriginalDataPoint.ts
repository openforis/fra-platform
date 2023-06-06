import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Functions } from 'utils/functions'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'
import { ODPs, OriginalDataPoint } from 'meta/assessment'

type Props = CycleParams & {
  originalDataPoint: OriginalDataPoint
}

const createOriginalDataPoint = async (props: Props): Promise<OriginalDataPoint> => {
  const { countryIso, assessmentName, cycleName, originalDataPoint } = props

  const { data } = await axios.post(
    ApiEndPoint.CycleData.OriginalDataPoint.one(),
    {
      originalDataPoint: ODPs.removeNationalClassPlaceHolder(originalDataPoint),
    },
    {
      params: {
        countryIso,
        assessmentName,
        cycleName,
        sectionName: 'extentOfForest',
      },
    }
  )
  return ODPs.addNationalClassPlaceHolder(data)
}

const putOriginalDataPoint = Functions.debounce(
  async (props: Props) => {
    const { countryIso, assessmentName, cycleName, originalDataPoint } = props

    await axios.put(
      ApiEndPoint.CycleData.OriginalDataPoint.one(),
      {
        originalDataPoint: ODPs.removeNationalClassPlaceHolder(originalDataPoint),
      },
      {
        params: {
          countryIso,
          assessmentName,
          cycleName,
          sectionName: 'extentOfForest',
        },
      }
    )
  },
  1000,
  'updateOriginalDataPoint'
)

export const updateOriginalDataPoint = createAsyncThunk<OriginalDataPoint, Props>('originalDataPoint/update', async (props) => {
  if (!props.originalDataPoint.id) return createOriginalDataPoint(props)
  putOriginalDataPoint(props)
  return props.originalDataPoint
})
