import axios from 'axios'

export const listCountries = 'navigation/country/list'

export const getCountryList = () => dispatch => {
  axios.get('/api/country/all').then(resp => {
    dispatch({type: listCountries, countries: resp.data})
  })
}
export const fetchNavStatus = countryIso => dispatch => {
  axios.get(`/api/status/${countryIso}`).then(resp => {
    dispatch({type: listCountries, countries: resp.data})
  })
}
