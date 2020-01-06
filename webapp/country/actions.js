import axios from 'axios'
import * as R from 'ramda'

import { applicationError } from '@webapp/loggedin/applicationError/actions'
import * as autosave from '../autosave/actions'
export const listCountries = 'country/country/list'
export const fetchCountryOverviewStatusCompleted = 'country/status/completed'
export const countryConfig = 'country/countryConfig'
export const changeCountryConfigSetting = '/country/changeSetting'

export const getCountryList = () => dispatch => {
  axios.get('/api/country/all').then(resp => {
    dispatch({type: listCountries, countries: resp.data})
  })
}

export const fetchCountryOverviewStatus = countryIso => dispatch => {
  axios.get(`/api/country/overviewStatus/${countryIso}`).then(resp => {
    dispatch({type: fetchCountryOverviewStatusCompleted, status: resp.data})
  })
    .catch((err) => dispatch(applicationError(err)))
}

export const getCountryConfig = countryIso => dispatch => {
  axios.get(`/api/country/config/${countryIso}`).then(resp => {
    dispatch({type: countryConfig, config: resp.data})
  })
    .catch((err) => dispatch(applicationError(err)))
}

export const saveCountryConfigSetting = (countryIso, key, value, onComplete = null) => dispatch => {
  dispatch(autosave.start)
  dispatch({type: changeCountryConfigSetting, key, value})
  axios.post(`/api/country/config/${countryIso}`, {key, value})
    .then(() => {
      dispatch(autosave.complete)
      if (onComplete) onComplete()
    })
    .catch((err) => dispatch(applicationError(err)))
}

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
