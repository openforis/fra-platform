import axios from 'axios'
import * as R from 'ramda'
import { applicationError } from '../applicationError/actions'
import * as autosave from '../autosave/actions'

export const valueChangeStart = 'nationalDataEntry/value/change/start'
export const valuesFetched = 'nationalDataEntry/value/fetch/completed'

const fetched = (countryIso, data) => ({
  type: valuesFetched,
  countryIso, data
})

const change = ({countryIso, name, value}) => {
  const dispatched = dispatch => {
    return axios.post(`/api/country/${countryIso}/${name}`, value).then(() => {
      dispatch(autosave.complete)
    }).catch((err) => {
      dispatch(applicationError(err))
    })
  }
  dispatched.meta = {
    debounce: {
      time: 800,
      key: `valueChangeStart_${name}`
    }
  }
  return dispatched
}

const start = ({name, value}) => ({type: valueChangeStart, name, value})

const sanitize = (newValue, currentValue) => {
  if (newValue === '') return null
  if (isNaN(newValue)) return currentValue
  return Number(newValue)
}

export const save = (countryIso, name, newValue, fraValue, field) => dispatch => {
  const sanitizedValue = sanitize(newValue, fraValue[field])
  const newFraValue = {...fraValue, [field]: sanitizedValue}
  dispatch(start({name, value: newFraValue}))
  dispatch(autosave.start)
  dispatch(change({countryIso, name, value: newFraValue}))
}

export const fetch = (countryIso) => dispatch => {
  axios.get(`/api/country/${countryIso}`).then(resp => {
    dispatch(fetched(countryIso, resp.data))
  }).catch (err => dispatch(applicationError(err)))
}

export const generateFraValuesStart = 'nationalDataEntry/generateFraValues/start'

export const generateFraValues = (countryIso) => dispatch => {
  dispatch({type: generateFraValuesStart})

  axios.post(`/api/country/estimation/generateFraValues/${countryIso}`).then(resp => {
    dispatch(fetch(countryIso))
  })
}
