import { ApiEndPoint } from '@common/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'
import { RoleName, User } from '@meta/user'

type Params = {
  countryIso: CountryIso
  assessmentName: AssessmentName
  cycleName: string
  email: string
  name: string
  role: RoleName
}

export const inviteUser = createAsyncThunk<User, Params>('usermanagement/post/invite', async (params) => {
  const { data } = await axios.post(ApiEndPoint.User.invite(), null, { params })
  return data
})
