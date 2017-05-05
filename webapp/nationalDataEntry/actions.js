import axios from "axios"
import * as R from "ramda"

export const valueChangeStart = 'nationalDataEntry/value/change/start'
export const valueChangeCompleted = 'nationalDataEntry/value/change/completed'
export const valuesFetched = 'nationalDataEntry/value/fetch/completed'

const changed = ({name, value}) => ({
  type: valueChangeCompleted,
  name, value
})

const fetched = (countryId, data) => ({
  type: valuesFetched,
  countryId, data
})

const change = ({countryId, name, value, data}) => {
  const dispatched = dispatch =>
    axios.post(`/api/country/${countryId}`, R.assocPath(["columns", name, "value"], value, data)).then(() => {
      dispatch(changed({name, value}))
    })
  dispatched.meta = {
    debounce: {
      time: 800,
      key: "CHANGED"
    }
  }
  return dispatched
}

const start = ({name, value}) => ({type: valueChangeStart, name, value})

export const save = (countryId, name, value, data) => dispatch => {
    dispatch(start({name, value}))
    dispatch(change({countryId, name, value, data}))
}

export const fetch = (countryId) => dispatch => {
  axios.get(`/api/country/${countryId}`).then(resp => {
    dispatch(fetched(countryId, resp.data))
  })
}

