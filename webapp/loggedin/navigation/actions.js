import axios from 'axios'
import * as R from 'ramda'

import { fetchCountryOverviewStatus, getCountryList } from '@webapp/country/actions'

export const changeAssessmentStatusInitiated = 'navigation/changeAssessmentStatusInitiated'
export const toggleShowNavigation = 'navigation/toggleShow'
export const toggleNavigationGroup = 'navigation/toggleGroup'
export const toggleAllNavigationGroups = 'navigation/toggleAllGroups'

export const toggleNavigationVisible = () => ({ type: toggleShowNavigation })

export const changeAssessment = (countryIso, assessment, notifyUsers) => async dispatch => {
  dispatch({ type: changeAssessmentStatusInitiated, assessmentType: assessment.type })
  await axios.post(`/api/assessment/${countryIso}?notifyUsers=${notifyUsers}`, assessment)

  dispatch(getCountryList())
  dispatch(fetchCountryOverviewStatus(countryIso))
}

export const toggleNavigationGroupCollapse = (assessment, sectionNo) => ({
  type: toggleNavigationGroup,
  assessment,
  sectionNo
})

export const toggleAllNavigationGroupsCollapse = () => ({ type: toggleAllNavigationGroups })

export const toggleAssessmentLockChange = 'navigation/assessment/toggleLock'

export const toggleAssessmentLock = assessmentName => (dispatch, getState) => {
  const locked = R.pipe(
    R.path(['country', 'status', 'assessments', assessmentName, 'locked']),
    R.defaultTo(true),
    R.not
  )(getState())

  dispatch({ type: toggleAssessmentLockChange, assessmentName, locked })
}
