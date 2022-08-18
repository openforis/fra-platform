import { ApiEndPoint } from '@common/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const updateSectionAuth = createAsyncThunk<
  void,
  {
    id: number
    sections: Record<string, boolean>
  }
>('usermanagement/post/countryAccess', async ({ id, sections }) => {
  await axios.post(ApiEndPoint.User.sectionAuth(), {
    id,
    sections,
  })
})
