import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Dispatch } from 'redux'
import { Functions } from 'utils/functions'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area'
import { AssessmentName } from 'meta/assessment'
import { RoleName } from 'meta/user'

import { UserManagementActions } from '../slice'

type Params = {
  assessmentName: AssessmentName
  cycleName: string
  countries?: Array<CountryIso>
  fullName?: string
  includeRoleTotals?: boolean
  roles?: Array<RoleName>
}

const throttledGetUsersCount = Functions.throttle(
  async (params: Params, dispatch: Dispatch) => {
    try {
      const { data } = await axios.get(ApiEndPoint.Admin.usersCount(), {
        params,
      })
      dispatch(UserManagementActions.setUsersCount(data))
    } catch (e) {
      // placeholder to avoid app crash
    }
    return null
  },
  500,
  { leading: true, trailing: true }
)

export const getUsersCount = createAsyncThunk<void, Params>(
  'userManagement/get/usersCount',
  async (params, { dispatch }) => {
    throttledGetUsersCount(params, dispatch)
  }
)
