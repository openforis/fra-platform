import axios from 'axios'

import { fetchCountryOverviewStatus, getCountryList } from '@webapp/country/actions'

export const changeAssessmentStatusInitiated = 'navigation/changeAssessmentStatusInitiated'
export const navigationToggleVisible = 'navigation/toggleShow'

export const toggleNavigation = () => ({ type: navigationToggleVisible })

export const changeAssessment = (countryIso, assessment, notifyUsers) => async dispatch => {
  dispatch({ type: changeAssessmentStatusInitiated, assessmentType: assessment.type })
  await axios.post(`/api/assessment/${countryIso}?notifyUsers=${notifyUsers}`, assessment)

  dispatch(getCountryList())
  dispatch(fetchCountryOverviewStatus(countryIso))
}


