import axios from 'axios'
import * as R from 'ramda'
import { batch } from 'react-redux'

import * as AppState from '@webapp/app/appState'

import * as autosave from '@webapp/app/components/autosave/actions'
import { appCountryIsoUpdate } from '@webapp/app/actions'

export const listCountries = 'country/country/list'
export const fetchCountryOverviewStatusCompleted = 'country/status/completed'
export const countryConfig = 'country/countryConfig'
export const changeCountryConfigSetting = '/country/changeSetting'

export const fetchCountryOverviewStatus = countryIso => async dispatch => {
  const { data: status } = await axios.get(`/api/country/overviewStatus/${countryIso}`)
  dispatch({ type: fetchCountryOverviewStatusCompleted, status })
}

export const getCountryConfig = countryIso => async dispatch => {
  const { data: config } = await axios.get(`/api/country/config/${countryIso}`)
  dispatch({ type: countryConfig, config })
}

export const fetchCountryInitialData = countryIso => dispatch => {
  batch(() => {
    dispatch({ type: appCountryIsoUpdate, countryIso })
    dispatch(fetchCountryOverviewStatus(countryIso))
    dispatch(getCountryConfig(countryIso))
  })
}

export const fetchCountryList = () => async dispatch => {
  const { data: countries } = await axios.get('/api/country/all')
  dispatch({ type: listCountries, countries })
}

export const saveCountryConfigSetting = (key, value, onComplete) => async (dispatch, getState) => {
  const countryIso = AppState.getCountryIso(getState())

  batch(() => {
    dispatch(autosave.start)
    dispatch({ type: changeCountryConfigSetting, key, value })
  })

  await axios.post(`/api/country/config/${countryIso}`, { key, value })

  batch(() => {
    dispatch(autosave.complete)
    if (onComplete) {
      dispatch(onComplete)
    }
  })
}

export const countryAssessmentStatusChanging = 'country/assessment/status/changing'

export const changeAssessment = (countryIso, assessment, notifyUsers) => async dispatch => {
  dispatch({ type: countryAssessmentStatusChanging, assessmentName: assessment.type })
  await axios.post(`/api/assessment/${countryIso}?notifyUsers=${notifyUsers}`, assessment)

  dispatch(fetchCountryList())
  dispatch(fetchCountryOverviewStatus(countryIso))
}

// ====== Methods below are DEPRECATED - use them from country model object
/**
 * @deprecated
 */
const getCountry = countryIso =>
  R.pipe(R.path(['country', 'countries']), R.values, R.flatten, R.find(R.propEq('countryIso', countryIso)))
/**
 * @deprecated
 */
export const getCountryName = (countryIso, lang) => (dispatch, getState) =>
  R.pipe(getCountry(countryIso), R.path(['listName', lang]))(getState())
