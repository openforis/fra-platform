import { ApiEndPoint } from '@common/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'

type Params = {
  countryIso: CountryIso
  assessmentName: AssessmentName
  cycleName: string
  invitationUuid: string
}

export const sendInvitationEmail = createAsyncThunk<void, Params>(
  'usermanagement/post/sendInvitationEmail',
  async (params) => {
    await axios.get(ApiEndPoint.User.sendInvitationEmail(), { params })
  }
)
