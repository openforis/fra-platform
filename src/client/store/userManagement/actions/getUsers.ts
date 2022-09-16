import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from '@meta/api/endpoint'
import { CycleParams } from '@meta/api/request'
import { User } from '@meta/user'

type Params = CycleParams & {
  print?: boolean
}

export const getUsers = createAsyncThunk<Array<User>, Params>('userManagement/get/users', async (params) => {
  const { data } = await axios.get(ApiEndPoint.User.many(), { params })
  return data
})
