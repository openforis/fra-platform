import { NavigateFunction } from 'react-router-dom'

import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from '@meta/api/endpoint'
import { CycleParams } from '@meta/api/request'
import { ClientRoutes } from '@meta/app'
import { ODPs, OriginalDataPoint } from '@meta/assessment'

export const createOriginalDataPoint = createAsyncThunk<
  OriginalDataPoint,
  CycleParams & {
    navigate: NavigateFunction
  }
>('originalDataPoint/create', async ({ assessmentName, cycleName, countryIso, navigate }) => {
  const originalDataPoint = { countryIso } as OriginalDataPoint
  const { data } = await axios.post(
    ApiEndPoint.CycleData.OriginalDataPoint.one(),
    {
      originalDataPoint,
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
  if (data?.id) {
    navigate(
      // After creating a new OriginalDataPoint, year is null, use -1 (handled in view)
      ClientRoutes.Assessment.OriginalDataPoint.Section.getLink({
        countryIso,
        assessmentName,
        cycleName,
        year: '-1',
        sectionName: 'extentOfForest',
      })
    )
  }
  return ODPs.addNationalClassPlaceHolder(data)
})
