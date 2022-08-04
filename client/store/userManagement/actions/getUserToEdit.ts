import { ApiEndPoint } from '@common/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'
import { User } from '@meta/user'

type Params = {
  countryIso: CountryIso
  assessmentName: AssessmentName
  cycleName: string
  id: number
}

export const getUserToEdit = createAsyncThunk<User, Params>('usermanagement/get/userToEdit', async (params) => {
  const { data } = await axios.get(ApiEndPoint.User.get(), { params })
  return data
})
