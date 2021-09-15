import axios from 'axios'

import { Country, Region, RegionGroup } from '@core/country'
import { createI18nPromise } from '@common/i18n/i18nFactory'
import { applicationError } from '@webapp/components/error/actions'

import * as UserState from '@webapp/store/user/state'

import ActionTypes from './actionTypes'

export const updateCountries = (countries: Array<Country>) => ({
  type: ActionTypes.updateCountries,
  countries,
})

export const updateRegions = (regions: Array<Region>) => ({
  type: ActionTypes.updateRegions,
  regions,
})

export const updateRegionGroups = (regionGroups: Array<RegionGroup>) => ({
  type: ActionTypes.updateRegionGroups,
  regionGroups,
})

export const switchLanguage = (lang: any) => async (dispatch: any, getState: any) => {
  try {
    const userInfo = UserState.getUserInfo(getState())
    if (userInfo) {
      await axios.post(`/api/user/lang?lang=${lang}`)
    }
    const i18n = await createI18nPromise(lang)

    if (lang === 'ar') document.body.classList.add('rtl')
    if (lang !== 'ar') document.body.classList.remove('rtl')

    dispatch({ type: ActionTypes.appI18nUpdate, i18n })
  } catch (err) {
    dispatch(applicationError(err))
  }
}
