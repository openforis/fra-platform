import axios from 'axios'
import R from 'ramda'
import { applicationError } from '../../applicationError/actions'

export const growingStockFetchCompleted = 'growingStock/fetch/completed'
export const growingStockChanged = 'growingStock/changed'

export const fetch = (countryIso) => dispatch =>
  axios
    .get(`/api/growingStock/${countryIso}`)
    .then(resp => dispatch({type: growingStockFetchCompleted, data: resp.data}))
    .catch(err => dispatch(applicationError(err)))

export const changeTotalValue = (countryIso, year, row, value) => (dispatch, getState) => {
  const growingStock = getState().growingStock
  const insertValue = R.assocPath(['totalTable', year, row], value, growingStock)
  console.log('changeTotalValue', growingStock, insertValue)
  dispatch({type: growingStockChanged, data: insertValue})
}

export const persistValues = (countryIso, values) => {
  const dispatched = dispatch => {
    axios
      .post(`/api/growingStock/${countryIso}`, values)
      .then(() => dispatch(autosave.complete))
  }

  dispatched.meta = {
    debounce: {
      time: 400,
      key: growingStockUpdateStart
    }
  }
  return dispatched
}
