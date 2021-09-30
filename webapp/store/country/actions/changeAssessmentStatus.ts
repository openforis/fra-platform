import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'
import { countryAssessmentStatusChanging } from '@webapp/app/country/actions'

import { createAsyncThunk } from '@reduxjs/toolkit'
import { CountryState } from '@webapp/store/country/CountryStateType'
import { CountryIso } from '@core/country'
import { AppDispatch } from '@webapp/store'
import { applicationError } from '@webapp/components/error/actions'
import { Assessment } from '@core/assessment'
import { getCountryStatus } from './getCountryStatus'

export type ChangeAssessmentPayloadType = {
  countryIso: CountryIso
  assessment: Assessment
  notifyUsers?: boolean
}

export const changeAssessmentStatus = createAsyncThunk<
  CountryState,
  ChangeAssessmentPayloadType,
  { dispatch: AppDispatch }
>('country/assessment/change', async ({ countryIso, assessment, notifyUsers }, { dispatch }) => {
  try {
    dispatch({ type: countryAssessmentStatusChanging, assessmentName: assessment.type })
    await axios.post(`${ApiEndPoint.Assessment.createEmail(countryIso)}?notifyUsers=${notifyUsers}`, assessment)

    dispatch(getCountryStatus(countryIso))
    return assessment.type
  } catch (err) {
    dispatch(applicationError(err))
    return {}
  }
})
