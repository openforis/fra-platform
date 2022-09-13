import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from '@meta/api/endpoint'
import { CycleParams } from '@meta/api/request'
import { User } from '@meta/user'

type Params = CycleParams & {
  user: User
  profilePicture: File | null
}

export const updateUser = createAsyncThunk<void, Params>('userManagement/put/update', async (params) => {
  const { user, profilePicture, countryIso, assessmentName, cycleName } = params

  const formData = new FormData()
  formData.append('profilePicture', profilePicture)
  formData.append('user', JSON.stringify(user))
  formData.append('countryIso', countryIso)
  formData.append('assessmentName', assessmentName)
  formData.append('cycleName', cycleName)

  await axios.put(ApiEndPoint.User.many(), formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
})
