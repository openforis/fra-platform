import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'
import { UserInvitationForm } from 'meta/form/userInvitation'

import { getUsers } from './getUsers'

type Props = CycleParams & { userInvitation: UserInvitationForm }

export const inviteUser = createAsyncThunk<void, Props>(
  'userManagement/post/invitation',
  async (props, { dispatch }) => {
    const { userInvitation, ...params } = props
    const { status } = await axios.post(ApiEndPoint.User.invite(), { userInvitation }, { params })
    if (status === 200) {
      // Update list of users after inviting a new user
      dispatch(getUsers(params))
    }
  }
)
