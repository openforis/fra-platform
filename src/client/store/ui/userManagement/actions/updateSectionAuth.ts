import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from '@meta/api/endpoint'
import { CollaboratorProps, CollaboratorSectionsProp, RoleName, UserRole } from '@meta/user'

export const updateSectionAuth = createAsyncThunk<
  UserRole<RoleName, CollaboratorProps>,
  {
    id: number
    sections: CollaboratorSectionsProp
  }
>('usermanagement/post/countryAccess', async ({ id, sections }) => {
  const { data } = await axios.post(ApiEndPoint.User.sectionAuth(), {
    id,
    sections,
  })

  return data
})
