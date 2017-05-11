import axios from "axios"
import * as R from "ramda"
import {applicationError} from "../applicationError/actions"

export const valueChangeStart = 'nationalDataEntry/value/change/start'
export const valueChangeCompleted = 'nationalDataEntry/value/change/completed'
export const valuesFetched = 'nationalDataEntry/value/fetch/completed'

const changed = ({name, value}) => ({
  type: valueChangeCompleted,
  name, value
})

const fetched = (countryIso, data) => ({
  type: valuesFetched,
  countryIso, data
})

const change = ({countryIso, name, value, data}) => {
  const dispatched = dispatch => {
      return axios.post(`/api/country/${countryIso}/${name}`, {forestArea: value}).then(() => {
          dispatch(changed({name, value}))
      }).catch((err) => {
          dispatch(applicationError(err))
      })
  }

  dispatched.meta = {
    debounce: {
      time: 800,
      key: valueChangeStart
    }
  }
  return dispatched
}

const start = ({name, value}) => ({type: valueChangeStart, name, value})

export const save = (countryIso, name, value, data) => dispatch => {
    dispatch(start({name, value}))
    dispatch(change({countryIso, name, value, data}))
}

export const fetch = (countryIso) => dispatch => {
  axios.get(`/api/country/${countryIso}`).then(resp => {
    dispatch(fetched(countryIso, resp.data))
  })
}

