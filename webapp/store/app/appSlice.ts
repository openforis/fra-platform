/* eslint-disable no-param-reassign */
import { Country, CountryIso, Region, RegionGroup } from '@core/country'
import ActionTypes from '@webapp/store/app/actions/actionTypes'
import axios from 'axios'
import { createI18nPromise } from '@common/i18n/i18nFactory'
import { applicationError } from '@webapp/components/error/actions'
import * as UserState from '@webapp/store/user/state'

import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit'
import { AssessmentType } from '@core/assessment'
import { initApp } from '@webapp/store/app/actions/initApp'
import { AppState } from '@webapp/store/app/types'

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
      action: PayloadAction<{
        countryIso: CountryIso
        assessmentType: AssessmentType
        printView: boolean
        printOnlyTablesView?: boolean
      }>
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
export const AppActions = {
  ...appSlice.actions,
  initApp,
}

export default appSlice.reducer as Reducer<AppState>
