import { createAsyncThunk } from '@reduxjs/toolkit'
import { User } from '@core/auth'
import { Areas, Country, Region, RegionGroup } from '@core/country'
import { getRequestParam } from '@webapp/utils/urlUtils'
import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'
import { applicationError } from '@webapp/components/error/actions'
import { AppActions } from '@webapp/store'
import i18nInstance from '@common/i18n/i18nInstance'

export const initApp = createAsyncThunk<{
  userInfo?: User
  countries?: Country[]
  regions?: Region[]
  regionGroups?: RegionGroup[]
}>('app/init', async (_, { dispatch }) => {
  let language = getRequestParam('lang')
  try {
    const getCountries = axios.get(ApiEndPoint.Country.GetAll.generalCountries())
    const getRegions = axios.get(ApiEndPoint.Country.getRegions())
    const getRegionGroups = axios.get(ApiEndPoint.Country.getRegionGroups())
    const getUserInfo = axios.get(ApiEndPoint.Auth.loggedInUser())

    const [
      { data: countries },
      { data: regions },
      { data: regionGroups },
      {
        data: { userInfo = null },
      },
    ] = await axios.all([getCountries, getRegions, getRegionGroups, getUserInfo])
    language = language ?? userInfo?.lang ?? 'en'

    dispatch(AppActions.switchLanguage(language))
    return {
      userInfo,
      countries: Areas.sortCountries(countries, i18nInstance.getInstance()),
      regions: Areas.sortRegions(regions, i18nInstance.getInstance()),
      regionGroups: Areas.sortRegionGroups(regionGroups),
    }
  } catch (err) {
    // 401 (Unauthorized) | Display error if any other status
    if (err.response && err.response.status !== 401) {
      dispatch(applicationError(err))
    }
    return { language }
  }
})
