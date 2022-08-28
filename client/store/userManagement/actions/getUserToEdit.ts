import { ApiEndPoint } from '@meta/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CycleParams } from '@meta/api/request'
import { User } from '@meta/user'

type Params = CycleParams & {
  id: number
}

export const getUserToEdit = createAsyncThunk<User, Params>('userManagement/get/userToEdit', async (params) => {
  const { data } = await axios.get(ApiEndPoint.User.one(), { params })
  return data
})
