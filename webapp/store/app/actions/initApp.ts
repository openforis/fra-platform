import { createAsyncThunk } from '@reduxjs/toolkit'
import { User } from '@core/auth'
import { Areas, Country, Region, RegionGroup } from '@core/country'
import { getRequestParam } from '@webapp/utils/urlUtils'
import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'
import { createI18nPromise } from '@common/i18n/i18nFactory'
import { applicationError } from '@webapp/components/error/actions'
import { i18n } from 'i18next'
import { AppDispatch } from '@webapp/store'

export const initApp = createAsyncThunk<
  {
    userInfo?: User
    countries?: Country[]
    regions?: Region[]
    regionGroups?: RegionGroup[]
    i18n: i18n
  },
  void,
  {
    dispatch: AppDispatch
  }
>('app/init', async (_, { dispatch }) => {
  const lang = getRequestParam('lang')
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

    const i18n: any = await createI18nPromise(lang || (userInfo ? userInfo.lang : 'en'))
    if (i18n.language === 'ar') document.body.classList.add('rtl')

    return {
      userInfo,
      i18n,
      countries: Areas.sortCountries(countries, i18n),
      regions: Areas.sortRegions(regions, i18n),
      regionGroups: Areas.sortRegionGroups(regionGroups),
    }
  } catch (err) {
    // 401 (Unauthorized) | Display error if any other status
    if (err.response && err.response.status !== 401) {
      dispatch(applicationError(err))
    }
    return { i18n: (await createI18nPromise(lang || 'en')) as i18n }
  }
})
