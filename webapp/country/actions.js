import axios from 'axios'
import { applicationError } from '../applicationError/actions'

export const listCountries = 'navigation/country/list'
export const fetchCountryOverviewStatusCompleted = 'navigation/status/completed'

export const getCountryList = () => dispatch => {
  axios.get('/api/country/all').then(resp => {
    dispatch({type: listCountries, countries: resp.data})
  })
}

export const fetchCountryOverviewStatus = countryIso => dispatch => {
  axios.get(`/api/country/overviewStatus/${countryIso}`).then(resp => {
    dispatch({type: fetchCountryOverviewStatusCompleted, status: resp.data})
  })
    .catch((err) => dispatch(applicationError(err)))
}
