import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch } from '@webapp/store'
import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'
import { applicationError } from '@webapp/../../../../client/components/error/actions'
import { CountryIso } from '@core/country'
import { CountryState } from '@webapp/store/country/countryStateType'

export const fetchCountryStatus = createAsyncThunk<CountryState, CountryIso | string, { dispatch: AppDispatch }>(
  'country/status',
  async (countryIso, { dispatch }) => {
    try {
      const { data: status } = await axios.get(ApiEndPoint.Country.getOverviewStatus(countryIso))

      return {
        status,
      }
    } catch (err) {
      dispatch(applicationError(err))
      return {}
    }
  }
)
