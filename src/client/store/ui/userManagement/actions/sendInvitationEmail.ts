import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from '@meta/api/endpoint'
import { CountryIso } from '@meta/area'
import { RoleName, UserRole } from '@meta/user'

type Params = { countryIso: CountryIso; invitationUuid: string }

export const sendInvitationEmail = createAsyncThunk<UserRole<RoleName>, Params>(
  'userManagement/post/sendInvitationEmail',
  async (params) => {
    const { data } = await axios.get(ApiEndPoint.User.invitationSendEmail(), { params })
    return data
  }
)
