import { RouteComponentProps } from 'react-router-dom'

import { ApiEndPoint } from '@common/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CountryIso } from '@meta/area'
import { AssessmentName, ODPs, OriginalDataPoint } from '@meta/assessment'

import { BasePaths } from '@client/basePaths'

export const createOriginalDataPoint = createAsyncThunk<
  OriginalDataPoint,
  {
    countryIso: CountryIso
    assessmentName: AssessmentName
    cycleName: string
    history: RouteComponentProps['history']
  }
>('originalDataPoint/create', async ({ assessmentName, cycleName, countryIso, history }) => {
  const originalDataPoint = { countryIso } as OriginalDataPoint
  const { data } = await axios.post(
    ApiEndPoint.Assessment.OriginalDataPoint.one(countryIso, assessmentName, cycleName),
    {
      originalDataPoint,
    }
  )
  if (data?.id) {
    history.push(
      // After creating a new OriginalDataPoint, year is null, use -1 (handled in view)
      BasePaths.Assessment.OriginalDataPoint.section(countryIso, assessmentName, cycleName, '-1', 'extentOfForest')
    )
  }
  return ODPs.addNationalClassPlaceHolder(data)
})
