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
}

export const getUsers = createAsyncThunk<Array<User>, Params>('usermanagement/get/users', async (params) => {
  const { data } = await axios.get(ApiEndPoint.User.many(), { params })
  return data
})
