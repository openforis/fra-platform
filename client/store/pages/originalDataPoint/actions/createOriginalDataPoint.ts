import { NavigateFunction } from 'react-router-dom'

import { ApiEndPoint } from '@common/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CountryIso } from '@meta/area'
import { AssessmentName, ODPs, OriginalDataPoint } from '@meta/assessment'

import { ClientRoutes } from '@client/clientRoutes'

export const createOriginalDataPoint = createAsyncThunk<
  OriginalDataPoint,
  {
    countryIso: CountryIso
    assessmentName: AssessmentName
    cycleName: string
    navigate: NavigateFunction
  }
>('originalDataPoint/create', async ({ assessmentName, cycleName, countryIso, navigate }) => {
  const originalDataPoint = { countryIso } as OriginalDataPoint
  const { data } = await axios.post(
    ApiEndPoint.Assessment.OriginalDataPoint.one(countryIso, assessmentName, cycleName),
    {
      originalDataPoint,
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
        section: 'extentOfForest',
      })
    )
  }
  return ODPs.addNationalClassPlaceHolder(data)
})
