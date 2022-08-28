import { ApiEndPoint } from '@meta/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CycleParams } from '@meta/api/request'
import { User } from '@meta/user'

export const getUsers = createAsyncThunk<Array<User>, CycleParams>('userManagement/get/users', async (params) => {
  const { data } = await axios.get(ApiEndPoint.User.many(), { params })
  return data
})
