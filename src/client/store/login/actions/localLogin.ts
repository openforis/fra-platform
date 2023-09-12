import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { User } from 'meta/user'

type Props = {
  email: string
  password: string
  invitationUuid?: string
}

export const localLogin = createAsyncThunk<User | undefined, Props>('login/local', async (props) => {
  const { email, password, invitationUuid } = props

  const { data } = await axios.post(ApiEndPoint.Auth.login(), { email, password }, { params: { invitationUuid } })

  return data
})
