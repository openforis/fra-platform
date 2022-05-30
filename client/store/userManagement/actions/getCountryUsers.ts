import { ApiEndPoint } from '@common/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CountryIso } from '@meta/area'
import { User } from '@meta/user'

type Params = {
  countryIso: CountryIso
}

export const getCountryUsers = createAsyncThunk<Array<User>, Params>(
  'usermanagement/get/countryUsers',
  async (params) => {
    const { countryIso } = params
    const { data } = await axios.get(ApiEndPoint.User.getByCountry(countryIso))
    return data
  }
)
