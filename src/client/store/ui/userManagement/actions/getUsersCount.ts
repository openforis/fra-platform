import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from '@meta/api/endpoint'
import { CountryIso } from '@meta/area'
import { RoleName } from '@meta/user'

type Params = {
  countries?: Array<CountryIso>
  roles?: Array<RoleName>
}

export const getUsersCount = createAsyncThunk<{ totals: number }, Params>(
  'userManagement/get/usersCount',
  async (params) => {
    const { data } = await axios.get(ApiEndPoint.Admin.usersCount(), {
      params,
    })

    return data
  }
)
