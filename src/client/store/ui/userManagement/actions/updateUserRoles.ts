import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Dispatch } from 'redux'
import { Functions } from 'utils/functions'

import { ApiEndPoint } from 'meta/api/endpoint'
import { AssessmentName } from 'meta/assessment'
import { RoleName, UserRole } from 'meta/user'

import { UserManagementActions } from '../slice'

type Params = {
  assessmentName: AssessmentName
  cycleName: string
  roles: Array<Partial<UserRole<RoleName>>>
  userId: number
}

const postUserRoles = Functions.debounce(
  async (params: Params, dispatch: Dispatch) => {
    try {
      const { data } = await axios.post(ApiEndPoint.User.roles(), params)

      dispatch(UserManagementActions.setUserToEdit(data))
    } catch (e) {
      // placeholder to avoid app crash
    }
    return null
  },
  1000,
  'updateUserRoles'
)

export const updateUserRoles = createAsyncThunk<void, Params>('userManagement/post/countryRoles', async (params, { dispatch }) => {
  postUserRoles(params, dispatch)
})
