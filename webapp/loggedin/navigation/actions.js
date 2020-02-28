import axios from 'axios'

import { fetchCountryOverviewStatus, getCountryList } from '@webapp/country/actions'

export const changeAssessmentStatusInitiated = 'navigation/changeAssessmentStatusInitiated'
export const toggleShowNavigation = 'navigation/toggleShow'

export const toggleNavigationVisible = () => ({ type: toggleShowNavigation })

export const changeAssessment = (countryIso, assessment, notifyUsers) => async dispatch => {
  dispatch({ type: changeAssessmentStatusInitiated, assessmentType: assessment.type })
  await axios.post(`/api/assessment/${countryIso}?notifyUsers=${notifyUsers}`, assessment)

  dispatch(getCountryList())
  dispatch(fetchCountryOverviewStatus(countryIso))
}


