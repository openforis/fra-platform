import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import { ApiEndPoint } from '@meta/api/endpoint'
import { OriginalDataPoint } from '@meta/assessment'
import { CountryIso } from '@meta/area'

export const deleteOriginalDataPoint = createAsyncThunk<
  void,
  { countryIso: CountryIso; assessmentName: string; cycleName: string; originalDataPoint: OriginalDataPoint }
>('originalDataPoint/delete', async ({ countryIso, assessmentName, cycleName, originalDataPoint }) => {
  await axios.delete(
    ApiEndPoint.Assessment.OriginalDataPoint.one(countryIso, assessmentName, cycleName, String(originalDataPoint.id))
  )
})
