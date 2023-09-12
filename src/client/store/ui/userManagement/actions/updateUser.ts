import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Functions } from 'utils/functions'

import { ApiEndPoint } from 'meta/api/endpoint'
import { AreaCode } from 'meta/area'
import { AssessmentName } from 'meta/assessment'
import { User, Users } from 'meta/user'

type Params = {
  assessmentName?: AssessmentName
  countryIso: AreaCode
  cycleName?: string
  user: User
  profilePicture?: File | null
}

const putUser = Functions.debounce(
  async (props: Params) => {
    const { user, profilePicture, assessmentName, countryIso, cycleName } = props

    try {
      const formData = new FormData()
      formData.append('assessmentName', assessmentName)
      formData.append('countryIso', countryIso)
      formData.append('cycleName', cycleName)
      formData.append('id', String(user.id))
      if (profilePicture) formData.append('profilePicture', profilePicture)
      formData.append('user', JSON.stringify(user))
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

export const updateUser = createAsyncThunk<Params, Params>('userManagement/put/update', (params) => {
  const { user } = params
  if (!Users.validate(user).isError) putUser(params)
  return params
})
