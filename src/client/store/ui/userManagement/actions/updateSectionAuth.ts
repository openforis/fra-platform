import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from '@meta/api/endpoint'
import { CountryIso } from '@meta/area'
import { CollaboratorProps, CollaboratorSectionsProp, RoleName, UserRole } from '@meta/user'

export const updateSectionAuth = createAsyncThunk<
  UserRole<RoleName, CollaboratorProps>,
  {
    id: number
    sections: CollaboratorSectionsProp
    params: {
      assessmentName: string
      cycleName: string
      countryIso: CountryIso
    }
  }
>('userManagement/post/countryAccess', async ({ id, sections, params }) => {
  const { data } = await axios.post(
    ApiEndPoint.User.sectionAuth(),
    {
      id,
      sections,
    },
    {
      params,
    }
  )

  return data
})
