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

//====== Assessment actions
export const countryAssessmentLockChange = 'country/assessment/toggleLock'
export const countryAssessmentStatusChanging = 'country/assessment/status/changing'

export const toggleAssessmentLock = (assessmentName, locked) =>
  ({ type: countryAssessmentLockChange, assessmentName, locked })

export const changeAssessment = (countryIso, assessment, notifyUsers) => async dispatch => {
  dispatch({ type: countryAssessmentStatusChanging, assessmentName: assessment.type })
  await axios.post(`/api/assessment/${countryIso}?notifyUsers=${notifyUsers}`, assessment)

  dispatch(getCountryList())
  dispatch(fetchCountryOverviewStatus(countryIso))
}

//====== Methods below are DEPRECATED - use them from country model object
/**
 * @deprecated
 */
const getCountry = countryIso => R.pipe(
  R.path(['country', 'countries']),
  R.values,
  R.flatten,
  R.find(R.propEq('countryIso', countryIso)),
)
/**
 * @deprecated
 */
export const getCountryName = (countryIso, lang) => (dispatch, getState) => R.pipe(
  getCountry(countryIso),
  R.path(['listName', lang])
)(getState())
