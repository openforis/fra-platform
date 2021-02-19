import axios from 'axios'

import { batchActions } from '@webapp/main/reduxBatch'

import * as AppState from '@webapp/store/app/state'

import * as autosave from '@webapp/app/components/autosave/actions'
import ActionTypes from '@webapp/store/app/actions/actionTypes'

export const fetchCountryOverviewStatusCompleted = 'country/status/completed'
export const countryConfig = 'country/countryConfig'
export const changeCountryConfigSetting = '/country/changeSetting'

export const fetchCountryOverviewStatus = (countryIso: any) => async (dispatch: any) => {
  const { data: status } = await axios.get(`/api/country/overviewStatus/${countryIso}`)
  dispatch({ type: fetchCountryOverviewStatusCompleted, status })
}

export const getCountryConfig = (countryIso: any) => async (dispatch: any) => {
  const { data: config } = await axios.get(`/api/country/config/${countryIso}`)
  dispatch({ type: countryConfig, config })
}

export const fetchCountryInitialData = (
  countryIso: any,
  assessmentType: any,
  printView: any,
  printOnlyTablesView: any
) => (dispatch: any) => {
  dispatch(
    batchActions([
      { type: ActionTypes.appCountryIsoUpdate, countryIso, assessmentType, printView, printOnlyTablesView },
      fetchCountryOverviewStatus(countryIso),
      getCountryConfig(countryIso),
    ])
  )
}

export const saveCountryConfigSetting = (key: any, value: any) => async (dispatch: any, getState: any) => {
  const countryIso = AppState.getCountryIso(getState())

  dispatch(batchActions([autosave.start, { type: changeCountryConfigSetting, key, value }]))

  await axios.post(`/api/country/config/${countryIso}`, { key, value })

  dispatch(autosave.complete)
}

export const countryAssessmentStatusChanging = 'country/assessment/status/changing'

export const changeAssessment = (countryIso: any, assessment: any, notifyUsers?: any) => async (dispatch: any) => {
  dispatch({ type: countryAssessmentStatusChanging, assessmentName: assessment.type })
  await axios.post(`/api/assessment/${countryIso}?notifyUsers=${notifyUsers}`, assessment)

  dispatch(fetchCountryOverviewStatus(countryIso))
}
