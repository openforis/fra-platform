import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'
import { Lang } from 'meta/lang'
import { CollaboratorPermissions, RoleName } from 'meta/user'

import { getUsers } from './getUsers'

type Params = CycleParams & {
  email: string
  lang: Lang
  name: string
  role: RoleName
  surname: string
}

type Body = {
  permissions?: CollaboratorPermissions
}

type Props = {
  body?: Body
  params: Params
}

export const inviteUser = createAsyncThunk<void, Props>(
  'userManagement/post/invitation',
  async (props, { dispatch }) => {
    const { body, params } = props
    const { status } = await axios.post(ApiEndPoint.User.invite(), body, { params })
    if (status === 200) {
      // Update list of users after inviting a new user
      dispatch(getUsers(params))
    }
  }
)
