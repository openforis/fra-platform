import axios from 'axios'
import { applicationError } from '../applicationError/actions'

export const listCountries = 'country/country/list'
export const fetchCountryOverviewStatusCompleted = 'country/status/completed'
export const countryConfig = 'country/countryConfig'

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

export const getCountryConfig = countryIso => dispatch => {
  axios.get(`/api/country/config/${countryIso}`).then(resp => {
    dispatch({type: countryConfig, config: resp.data})
  })
  .catch((err) => dispatch(applicationError(err)))
}
