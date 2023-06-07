import { createAsyncThunk } from '@reduxjs/toolkit'
import { Functions } from 'utils/functions'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area'
import { AssessmentName } from 'meta/assessment'
import { UserRole } from 'meta/user/userRole'

type Params = {
  id: number
  assessmentName: AssessmentName
  countryIso: CountryIso
  cycleName: string
  role: UserRole<any, any>
}

const postRoleProps = Functions.debounce(
  async (params: Params) => {
    try {
      await axios.post(ApiEndPoint.User.roleProps(), params)
    } catch (e) {
      // placeholder to avoid app crash
    }
    return null
  },
  1000,
  'updateRoleProps'
)

export const updateRoleProps = createAsyncThunk<Params, Params>('userManagement/post/roleProps', async (params) => {
  postRoleProps(params)
  return params
})
