import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area'
import { Collaborator } from 'meta/user'

/**
 * @deprecated
 */
export const updateSectionAuth = createAsyncThunk<
  Collaborator,
  {
    id: number
    sections: any // CollaboratorSectionsPermission
    params: {
      assessmentName: string
      cycleName: string
      countryIso: CountryIso
    }
  }
>('userManagement/post/countryAccess', async ({ id, params, sections }) => {
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
