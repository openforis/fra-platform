import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'

import { createAsyncThunk } from '@reduxjs/toolkit'
import { CountryIso } from '@core/country'
import { AppDispatch } from '@webapp/store'
import { applicationError } from '@webapp/components/error/actions'
import { Assessment, AssessmentStatus, AssessmentType } from '@core/assessment'
import { CountryActions } from '@webapp/store/country'

export type ChangeAssessmentPayloadType = {
  countryIso: CountryIso
  assessment: Assessment
  notifyUsers?: boolean
  status?: AssessmentStatus
}

export const changeAssessmentStatus = createAsyncThunk<
  {
    assessmentType: AssessmentType
    status: AssessmentStatus
  },
  ChangeAssessmentPayloadType,
  { dispatch: AppDispatch }
>(
  'country/assessment/change',
  async ({ countryIso, assessment, notifyUsers, status = AssessmentStatus.changing }, { dispatch }) => {
    try {
      await axios.post(`${ApiEndPoint._Assessment.createEmail(countryIso)}?notifyUsers=${notifyUsers}`, assessment)

      dispatch(CountryActions.fetchCountryStatus(countryIso))
      return { assessmentType: assessment.type, status }
    } catch (err) {
      dispatch(applicationError(err))
      return {}
    }
  }
)
