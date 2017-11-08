import axios from 'axios'
import { applicationError } from '../applicationError/actions'

export const listCountries = 'navigation/country/list'
export const fetchCountryOverviewStatusCompleted = 'navigation/status/completed'
export const changeAssessmentStatusInitiated = 'navigation/changeAssessmentStatusInitiated'
export const navigationScrolled = 'navigation/scroll/end'
export const toggleShowNavigation = 'navigation/toggleShow'

export const getCountryList = () => dispatch => {
  axios.get('/api/country/all').then(resp => {
    dispatch({type: listCountries, countries: resp.data})
  })
}

export const navigationScroll = scrollPos => ({type: navigationScrolled, position: scrollPos})

export const toggleNavigationVisible = () => ({type: toggleShowNavigation})

export const fetchCountryOverviewStatus = countryIso => dispatch => {
  axios.get(`/api/country/overviewStatus/${countryIso}`).then(resp => {
    dispatch({type: fetchCountryOverviewStatusCompleted, status: resp.data})
  })
    .catch((err) => dispatch(applicationError(err)))
}

export const changeAssessmentStatus = (countryIso, assessmentType, status) => dispatch => {
  dispatch({type: changeAssessmentStatusInitiated, assessmentType})
  axios.post(`/api/assessment/status/${countryIso}?assessmentType=${assessmentType}&status=${status}`)
    .then(() => {
      //Force update of country-list when it's opened next (review statuses might have changed):
      dispatch({type: listCountries, countries: []})
      fetchCountryOverviewStatus(countryIso)(dispatch)
    })
    .catch((err) => dispatch(applicationError(err)))
}
