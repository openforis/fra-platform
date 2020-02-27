import axios from 'axios'
import * as R from 'ramda'

import * as autosave from '@webapp/autosave/actions'

export const listCountries = 'country/country/list'
export const fetchCountryOverviewStatusCompleted = 'country/status/completed'
export const countryConfig = 'country/countryConfig'
export const changeCountryConfigSetting = '/country/changeSetting'

export const getCountryList = () => async dispatch => {
  const { data: countries } = await axios.get('/api/country/all')
  dispatch({ type: listCountries, countries })
}

export const fetchCountryOverviewStatus = countryIso => async dispatch => {
  const { data: status } = await axios.get(`/api/country/overviewStatus/${countryIso}`)
  dispatch({ type: fetchCountryOverviewStatusCompleted, status })
}

export const getCountryConfig = countryIso => async dispatch => {
  const { data: config } = await axios.get(`/api/country/config/${countryIso}`)
  dispatch({ type: countryConfig, config })
}

export const saveCountryConfigSetting = (countryIso, key, value, onComplete = null) => async dispatch => {
  dispatch(autosave.start)
  dispatch({ type: changeCountryConfigSetting, key, value })

  await axios.post(`/api/country/config/${countryIso}`, { key, value })

  dispatch(autosave.complete)
  if (onComplete) {
    onComplete()
  }
}

//Methods below are DEPRECATED - use them from country model object
const getCountry = countryIso => R.pipe(
  R.path(['country', 'countries']),
  R.values,
  R.flatten,
  R.find(R.propEq('countryIso', countryIso)),
)

export const getCountryName = (countryIso, lang) => (dispatch, getState) => R.pipe(
  getCountry(countryIso),
  R.path(['listName', lang])
)(getState())

export const isPanEuropeanCountry = countryIso => (dispatch, getState) => R.pipe(
  getCountry(countryIso),
  R.propEq('panEuropean', true),
)(getState())
