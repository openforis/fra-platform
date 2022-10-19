import { createAsyncThunk } from '@reduxjs/toolkit'
import { Functions } from '@utils/functions'
import axios from 'axios'

import { ApiEndPoint } from '@meta/api/endpoint'
import { CycleParams } from '@meta/api/request'
import { User } from '@meta/user'

type Params = CycleParams & {
  user: User
  profilePicture: File | null
}

const putUser = Functions.debounce(
  async (props: Params) => {
    const { user, profilePicture, countryIso, assessmentName, cycleName } = props

    try {
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
    } catch (e) {
      // placeholder to avoid app crash
    }
  },
  1000,
  'updateUser'
)

export const updateUser = createAsyncThunk<void, Params>('userManagement/put/update', (params) => {
  putUser(params)
})
