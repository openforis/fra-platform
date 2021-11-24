import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'

import { createAsyncThunk } from '@reduxjs/toolkit'
import { CountryIso } from '@core/country'
import { AppDispatch } from '../../../store'
import { applicationError } from '../../../components/error/actions'
import { Assessment, AssessmentStatus, AssessmentType } from '@core/assessment'
import { CountryActions } from '../../../store/country'

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
      await axios.post(`${ApiEndPoint.Assessment.createEmail(countryIso)}?notifyUsers=${notifyUsers}`, assessment)

      dispatch(CountryActions.fetchCountryStatus(countryIso))
      return { assessmentType: assessment.type, status }
    } catch (err) {
      dispatch(applicationError(err))
      return {}
    }
  }
)
