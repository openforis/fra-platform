import axios from 'axios'

import { applicationError } from '../../applicationError/actions'
import * as autosave from '../../autosave/actions'

import { updateGrowingStockValue, updateGrowingStockValues } from './growingStock'

export const growingStockFetchCompleted = 'growingStock/fetch/completed'
export const growingStockUpdateStart = 'growingStock/update/start'
export const growingStockUpdateCompleted = 'growingStock/update/completed'

export const fetch = countryIso => dispatch =>
  axios
    .get(`/api/growingStock/${countryIso}`)
    .then(resp => dispatch({type: growingStockFetchCompleted, data: resp.data}))
    .catch(err => dispatch(applicationError(err)))

export const updateValue = (countryIso, areaValues, values, year, field, type, value) => dispatch => {
  dispatch(autosave.start)
  const updatedValues = updateGrowingStockValue(areaValues, values, year, field, type, value)
  dispatch({type: growingStockUpdateStart, data: updatedValues})
  dispatch(persistUpdatedValues(countryIso, updatedValues))
}

export const updateValues = (countryIso, areaValues, growingStockValues, data, type, rowIdx, colIdx) => dispatch => {
  dispatch(autosave.start)
  const updatedValues = updateGrowingStockValues(areaValues, growingStockValues, data, type, rowIdx, colIdx)
  dispatch({type: growingStockUpdateStart, data: updatedValues})
  dispatch(persistUpdatedValues(countryIso, updatedValues))
}

export const persistUpdatedValues = (countryIso, values) => {
  const dispatched = dispatch => {
    axios
      .post(`/api/growingStock/${countryIso}`, values)
      .then(() => {
        dispatch(autosave.complete)
        dispatch({type: growingStockUpdateCompleted})
      })
  }

  dispatched.meta = {
    debounce: {
      time: 400,
      key: growingStockUpdateStart
    }
  }
  return dispatched
}
