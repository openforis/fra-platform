import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'
import { User } from 'meta/user'

type Params = (CycleParams & { id: number }) | { id: number }

export const getUserToEdit = createAsyncThunk<User, Params>('userManagement/get/userToEdit', async (params) => {
  const { data } = await axios.get(ApiEndPoint.User.one(), { params })
  return data
})
