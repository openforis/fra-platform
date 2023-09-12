import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area'
import { RoleName, UserRole } from 'meta/user'

type Params = { cycleName: string; assessmentName: string; countryIso: CountryIso; invitationUuid: string }

export const removeInvitation = createAsyncThunk<UserRole<RoleName>, Params>(
  'userManagement/delete/invitation',
  async (params) => {
    const { data } = await axios.delete(ApiEndPoint.User.invitation(), { params })
    return data
  }
)
