import { createAsyncThunk } from '@reduxjs/toolkit'
import { User } from '@core/auth'
import { Areas, Country, Region, RegionGroup } from '@core/country'
import { getRequestParam } from '../../../utils/urlUtils'
import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'
import { applicationError } from '../../../components/error/actions'

import { AppDispatch } from '../../../store'
import { Lang } from '@core/lang'

export const initApp = createAsyncThunk<
  {
    language: Lang | string
    userInfo?: User
    countries?: Country[]
    regions?: Region[]
    regionGroups?: RegionGroup[]
  },
  void,
  {
    dispatch: AppDispatch
  }
>('app/init', async (i18n, { dispatch }) => {
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
    if (language === 'ar') document.body.classList.add('rtl')

    return {
      userInfo,
      language,

      countries: Areas.sortCountries(countries, i18n),
      regions: Areas.sortRegions(regions, i18n),
      regionGroups: Areas.sortRegionGroups(regionGroups),
    }
  } catch (err) {
    // 401 (Unauthorized) | Display error if any other status
    if (err.response && err.response.status !== 401) {
      dispatch(applicationError(err))
    }
    return { language: language ?? 'en' }
  }
})
