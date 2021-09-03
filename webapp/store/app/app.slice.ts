import { Areas, Country, CountryIso, Region, RegionGroup } from '@core/country'
import ActionTypes from '@webapp/store/app/actions/actionTypes'
import { getRequestParam } from '@webapp/utils/urlUtils'
import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'
import { createI18nPromise } from '@common/i18n/i18nFactory'
import { applicationError } from '@webapp/components/error/actions'
import * as UserState from '@webapp/store/user/state'

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '@webapp/store/RootState'
import { AssessmentType } from '@core/assessment'
import { i18n } from 'i18next'
import { User } from '@core/auth'

const initApp = createAsyncThunk(
  'app/init',
  async (
    _,
    { dispatch }
  ): Promise<{
    userInfo?: User
    countries?: Country[]
    regions?: Region[]
    regionGroups?: RegionGroup[]
    i18n: i18n
  }> => {
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
  }
)

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

export interface AppState {
  loaded: boolean
}

const initialState: AppState = {
  loaded: false,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateCountries: (state, action: PayloadAction<Array<Country>>) => {
      state.countries = action.payload
    },

    updateRegions: (state, action: PayloadAction<Array<Region>>) => {
      state.regions = action.payload
    },

    updateRegionGroups: (state, action: PayloadAction<Array<RegionGroup>>) => {
      state.regionGroups = action.payload
    },

    updateCountryIso: (
      state,
      action: PayloadAction<{ countryIso: CountryIso; assessmentType: AssessmentType; printView: boolean }>
    ) => {
      const { countryIso, assessmentType, printView, printOnlyTablesView } = action.payload
      state.countryIso = countryIso
      state.assessmentType = assessmentType
      if (printView) {
        state.printView = {
          onlyTables: printOnlyTablesView,
        }
      }
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(initApp.fulfilled, (state, { payload }) => {
        state.userInfo = payload.userInfo
        state.countries = payload.countries
        state.regions = payload.regions
        state.regionGroups = payload.regionGroups
        state.loaded = true
        // TODO Remove
        state.i18n = payload.i18n
      })
      .addCase(initApp.rejected, (state, { payload }) => {
        state.regionGroups = payload.regionGroups
        state.loaded = true
      })
  },
})

export const { updateCountries, updateRegions, updateRegionGroups } = appSlice.actions

export const AppSelectors = {
  selectLoaded: (state: RootState) => state.app.loaded,
  selectAssessmentType: (state: RootState): AssessmentType => state.app.assessmentType,
  selectCountryIso: (state: RootState): AssessmentType => state.app.countryIso,
  selectCountries: (state: RootState) => state.app.countries,
  selectRegions: (state: RootState) => state.app.regions,
  selectRegionGroups: (state: RootState): Array<RegionGroup> => state.app.regionGroups,
  selectPrintView: (state: RootState) => !!state.app.printview,
  selectPrintViewOnlyTablesView: (state: RootState) => !!state.app.printView?.printOnlyTablesView,
  // TODO: Remove
  selectI18n: (state: RootState): i18n => state.app.i18n,
}

export const AppActions = {
  ...appSlice.actions,
  initApp,
}

export default appSlice.reducer
