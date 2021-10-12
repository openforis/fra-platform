import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'
import { getUrlParameter } from '@webapp/utils/urlUtils'

export const initLogin = createAsyncThunk('login/init', async (_) => {
  const defaultUser = { type: 'google', email: '', password: '' }

  const invitationUUID = getUrlParameter('i')
  if (invitationUUID) {
    axios.get(ApiEndPoint.Auth.getInvitation(invitationUUID)).then((res) => {
      const { invitation, user } = res.data
      return {
        invitation,
        user: user ? { ...user, password: '' } : { ...defaultUser, email: invitation.email },
      }
    })
  }
  return { user: defaultUser }
})
