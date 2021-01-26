import axios from 'axios'

import { batchActions } from '@webapp/main/reduxBatch'

import * as AppState from '@webapp/app/appState'

import * as autosave from '@webapp/app/components/autosave/actions'
import { appCountryIsoUpdate } from '@webapp/store/app/actions'

export const fetchCountryOverviewStatusCompleted = 'country/status/completed'
export const countryConfig = 'country/countryConfig'
export const changeCountryConfigSetting = '/country/changeSetting'

export const fetchCountryOverviewStatus = (countryIso) => async (dispatch) => {
  const { data: status } = await axios.get(`/api/country/overviewStatus/${countryIso}`)
  dispatch({ type: fetchCountryOverviewStatusCompleted, status })
}

export const getCountryConfig = (countryIso) => async (dispatch) => {
  const { data: config } = await axios.get(`/api/country/config/${countryIso}`)
  dispatch({ type: countryConfig, config })
}

export const fetchCountryInitialData = (countryIso, assessmentType, printView, printOnlyTablesView) => (dispatch) => {
  dispatch(
    batchActions([
      { type: appCountryIsoUpdate, countryIso, assessmentType, printView, printOnlyTablesView },
      fetchCountryOverviewStatus(countryIso),
      getCountryConfig(countryIso),
    ])
  )
}

export const saveCountryConfigSetting = (key, value) => async (dispatch, getState) => {
  const countryIso = AppState.getCountryIso(getState())

  dispatch(batchActions([autosave.start, { type: changeCountryConfigSetting, key, value }]))

  await axios.post(`/api/country/config/${countryIso}`, { key, value })

  dispatch(autosave.complete)
}

export const countryAssessmentStatusChanging = 'country/assessment/status/changing'

export const changeAssessment = (countryIso, assessment, notifyUsers) => async (dispatch) => {
  dispatch({ type: countryAssessmentStatusChanging, assessmentName: assessment.type })
  await axios.post(`/api/assessment/${countryIso}?notifyUsers=${notifyUsers}`, assessment)

  dispatch(fetchCountryOverviewStatus(countryIso))
}
