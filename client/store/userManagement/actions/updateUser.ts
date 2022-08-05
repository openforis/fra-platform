import { ApiEndPoint } from '@common/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'
import { User } from '@meta/user'

type Params = {
  user: User
  profilePicture: File | null
  countryIso: CountryIso
  assessmentName: AssessmentName
  cycleName: string
}

export const updateUser = createAsyncThunk<void, Params>('usermanagement/post/update', async (params) => {
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
