import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area'
import { Collaborator, CollaboratorSectionsPermission } from 'meta/user'

export const updateSectionAuth = createAsyncThunk<
  Collaborator,
  {
    id: number
    sections: CollaboratorSectionsPermission
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
