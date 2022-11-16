import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from '@meta/api/endpoint'
import { CountryIso } from '@meta/area'
import { RoleName, User } from '@meta/user'

type Params = {
  countryIso?: CountryIso
  assessmentName?: string
  cycleName?: string
  print?: boolean
  limit?: number
  offset?: number
  countries?: Array<CountryIso>
  roles?: Array<RoleName>
}

export const getUsers = createAsyncThunk<Array<User>, Params>('userManagement/get/users', async (params) => {
  const { assessmentName, cycleName } = params

  const { data } = await axios.get(assessmentName && cycleName ? ApiEndPoint.User.many() : ApiEndPoint.Admin.users(), {
    params,
  })

  return data
})
