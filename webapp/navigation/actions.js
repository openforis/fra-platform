import axios from 'axios'
import { applicationError } from '../applicationError/actions'

export const listCountries = 'navigation/country/list'
export const fetchNavStatusCompleted = 'navigation/status/completed'

export const getCountryList = () => dispatch => {
  axios.get('/api/country/all').then(resp => {
    dispatch({type: listCountries, countries: resp.data})
  })
}

export const fetchNavStatus = countryIso => dispatch => {
  axios.get(`/api/nav/status/${countryIso}`).then(resp => {
    dispatch({type: fetchNavStatusCompleted, status: resp.data})
  })
}

export const changeAssessmentStatus = (countryIso, assessmentType, status) => dispatch => {
  axios.post(`/api/assessment/status/${countryIso}?assessmentType=${assessmentType}&status=${status}`)
    .then(() => {
      fetchNavStatus(countryIso)(dispatch)
    })
    .catch((err) => dispatch(applicationError(err)))
}
