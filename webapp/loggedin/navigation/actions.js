import axios from 'axios'
import { applicationError } from '../applicationError/actions'
import { fetchCountryOverviewStatus, getCountryList } from '../../country/actions'
import * as R from 'ramda'

export const changeAssessmentStatusInitiated = 'navigation/changeAssessmentStatusInitiated'
export const toggleShowNavigation = 'navigation/toggleShow'
export const toggleNavigationGroup = 'navigation/toggleGroup'
export const toggleAllNavigationGroups = 'navigation/toggleAllGroups'


export const toggleNavigationVisible = () => ({type: toggleShowNavigation})

export const changeAssessment = (countryIso, assessment, notifyUsers) => dispatch => {
  dispatch({type: changeAssessmentStatusInitiated, assessmentType: assessment.type})
  axios.post(`/api/assessment/${countryIso}?notifyUsers=${notifyUsers}`, assessment)
    .then(() => {
      getCountryList()(dispatch)
      fetchCountryOverviewStatus(countryIso)(dispatch)
    })
    .catch((err) => dispatch(applicationError(err)))
}

export const toggleNavigationGroupCollapse = (assessment, sectionNo) => ({
  type: toggleNavigationGroup,
  assessment,
  sectionNo
})

export const toggleAllNavigationGroupsCollapse = () => ({type: toggleAllNavigationGroups})

export const toggleAssessmentLockChange = 'navigation/assessment/toggleLock'

export const toggleAssessmentLock = assessmentName => (dispatch, getState) => {
  const locked = R.pipe(
    R.path(['country', 'status', 'assessments', assessmentName, 'locked']),
    R.defaultTo(true),
    R.not
  )(getState())

  dispatch({type: toggleAssessmentLockChange, assessmentName, locked})
}
