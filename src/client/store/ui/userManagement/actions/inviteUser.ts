import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'
import { Lang } from 'meta/lang'
import { CollaboratorPermissions, RoleName } from 'meta/user'

import { getUsers } from './getUsers'

type Props = CycleParams & {
  email: string
  lang: Lang
  name: string
  permissions?: CollaboratorPermissions
  role: RoleName
  surname: string
}

export const inviteUser = createAsyncThunk<void, Props>(
  'userManagement/post/invitation',
  async (props, { dispatch }) => {
    const { permissions, ...params } = props
    const { status } = await axios.post(ApiEndPoint.User.invite(), { permissions }, { params })
    if (status === 200) {
      // Update list of users after inviting a new user
      dispatch(getUsers(params))
    }
  }
)
