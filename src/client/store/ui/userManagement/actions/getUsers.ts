import { createAsyncThunk } from '@reduxjs/toolkit'
import { Functions } from 'utils/functions'
import axios from 'axios'
import { Dispatch } from 'redux'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area'
import { RoleName } from 'meta/user'

import { UserManagementActions } from '../slice'

type Params = {
  assessmentName?: string
  countryIso?: CountryIso
  cycleName?: string
  print?: boolean
  limit?: number
  offset?: number
  countries?: Array<CountryIso>
  fullName?: string
  roles?: Array<RoleName>
  administrators?: boolean
}

const throttledGetUsers = Functions.throttle(
  async (params: Params, dispatch: Dispatch) => {
    try {
      const { countryIso } = params

      const { data } = await axios.get(countryIso ? ApiEndPoint.User.many() : ApiEndPoint.Admin.users(), {
        params,
      })

      dispatch(UserManagementActions.setUsers(data))
    } catch (e) {
      // placeholder to avoid app crash
    }
    return null
  },
  500,
  { leading: true, trailing: true }
)

export const getUsers = createAsyncThunk<void, Params>('userManagement/get/users', async (params, { dispatch }) => {
  throttledGetUsers(params, dispatch)
})
