import axios from 'axios'
import { applicationError } from '../applicationError/actions'
import { fetchCountryOverviewStatus, listCountries } from '../country/actions'

export const changeAssessmentStatusInitiated = 'navigation/changeAssessmentStatusInitiated'
export const navigationScrolled = 'navigation/scroll/end'
export const toggleShowNavigation = 'navigation/toggleShow'
export const toggleNavigationGroup = 'navigation/toggleGroup'
export const toggleAllNavigationGroups = 'navigation/toggleAllGroups'

export const navigationScroll = scrollPos => ({type: navigationScrolled, position: scrollPos})

export const toggleNavigationVisible = () => ({type: toggleShowNavigation})

export const changeAssessment = (countryIso, assessment) => dispatch => {
  dispatch({type: changeAssessmentStatusInitiated, assessmentType: assessment.type})
  axios.post(`/api/assessment/${countryIso}`, assessment)
    .then(() => {
      //Force update of country-list when it's opened next (review statuses might have changed):
      dispatch({type: listCountries, countries: []})
      fetchCountryOverviewStatus(countryIso)(dispatch)
    })
    .catch((err) => dispatch(applicationError(err)))
}

export const toggleNavigationGroupCollapse = (assessment, sectionNo) => ({type: toggleNavigationGroup, assessment, sectionNo})
export const toggleAllNavigationGroupsCollapse = () => ({type: toggleAllNavigationGroups})
