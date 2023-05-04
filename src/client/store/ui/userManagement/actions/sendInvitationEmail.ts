import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from '@meta/api/endpoint'
import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'
import { RoleName, UserRole } from '@meta/user'

type Params = { assessmentName: AssessmentName; countryIso: CountryIso; cycleName: string; invitationUuid: string }

export const sendInvitationEmail = createAsyncThunk<UserRole<RoleName>, Params>(
  'userManagement/post/sendInvitationEmail',
  async (params) => {
    const { data } = await axios.get(ApiEndPoint.User.invitationSendEmail(), { params })
    return data
  }
)
