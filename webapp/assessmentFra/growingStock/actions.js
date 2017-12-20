import axios from 'axios'
import R from 'ramda'
import { applicationError } from '../../applicationError/actions'
import * as autosave from '../../autosave/actions'
export const growingStockFetchCompleted = 'growingStock/fetch/completed'
export const growingStockChanged = 'growingStock/changed'
import { acceptNextDecimal} from '../../utils/numberInput'

export const fetch = (countryIso) => dispatch =>
  axios
    .get(`/api/growingStock/${countryIso}`)
    .then(resp => dispatch({type: growingStockFetchCompleted, data: resp.data}))
    .catch(err => dispatch(applicationError(err)))

export const changeAvgValue = (countryIso, year, row, newValue) => (dispatch, getState) => {
  const growingStock = getState().growingStock
  const currentValue = R.path(['avgTable', year, row], growingStock)
  const sanitizedValue = acceptNextDecimal(newValue, currentValue)
  const insertValue = R.assocPath(['avgTable', year, row], sanitizedValue, growingStock)
  dispatch(autosave.start)
  dispatch({type: growingStockChanged, data: insertValue})
  dispatch(persistValues(countryIso, insertValue))
}

export const changeTotalValue = (countryIso, year, row, newValue) => (dispatch, getState) => {
  const growingStock = getState().growingStock
  const currentValue = R.path(['avgTable', year, row], growingStock)
  const sanitizedValue = acceptNextDecimal(newValue, currentValue)
  const insertValue = R.assocPath(['totalTable', year, row], sanitizedValue, growingStock)
  dispatch(autosave.start)
  dispatch({type: growingStockChanged, data: insertValue})
  dispatch(persistValues(countryIso, insertValue))
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
      key: growingStockChanged
    }
  }
  return dispatched
}
