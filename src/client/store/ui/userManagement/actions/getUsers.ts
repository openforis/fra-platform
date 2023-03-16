import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from '@meta/api/endpoint'
import { CountryIso } from '@meta/area'
import { RoleName, User } from '@meta/user'

type Params = {
  assessmentName?: string
  countryIso?: CountryIso
  cycleName?: string
  print?: boolean
  limit?: number
  offset?: number
  userName?: string
  countries?: Array<CountryIso>
  roles?: Array<RoleName>
  administrators?: boolean
}

export const getUsers = createAsyncThunk<Array<User>, Params>('userManagement/get/users', async (params) => {
  const { countryIso } = params

  const { data } = await axios.get(countryIso ? ApiEndPoint.User.many() : ApiEndPoint.Admin.users(), {
    params,
  })

  return data
})
