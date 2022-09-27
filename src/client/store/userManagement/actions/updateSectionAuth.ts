import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from '@meta/api/endpoint'
import { CollaboratorEditPropertyType, CollaboratorProps, RoleName, UserRole } from '@meta/user'

export const updateSectionAuth = createAsyncThunk<
  UserRole<RoleName, CollaboratorProps>,
  {
    id: number
    sections: 'all' | 'none' | Record<string, { [key in keyof typeof CollaboratorEditPropertyType]?: boolean }>
  }
>('usermanagement/post/countryAccess', async ({ id, sections }) => {
  const { data } = await axios.post(ApiEndPoint.User.sectionAuth(), {
    id,
    sections,
  })

  return data
})
