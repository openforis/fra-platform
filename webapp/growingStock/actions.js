import axios from 'axios'
import * as R from 'ramda'

import { applicationError } from '../applicationError/actions'
import * as autosave from '../autosave/actions'

export const growingStockFetchCompleted = 'growingStock/fetch/completed'
export const growingStockUpdateStart = 'growingStock/update/start'
export const growingStockUpdateCompleted = 'growingStock/update/completed'

export const fetch = countryIso => dispatch =>
  axios
    .get(`/api/growingStock/${countryIso}`)
    .then(resp => dispatch({type: growingStockFetchCompleted, data: resp.data}))
    .catch(err => dispatch(applicationError(err)))

const updValue = (fra, values, countryIso, year, field, type, value) => {

  const updatedValue = R.pipe(
    R.find(R.propEq('year', year)),
    R.defaultTo({year}),
    R.assoc(`${field}${type === 'avg' ? 'Avg' : ''}`, Number(value))
  )(values)
  console.log('---1 updated value ', updatedValue)

  const index = R.findIndex(R.propEq('year', year), values)

  const updatedValues = index >= 0
    ? R.update(index, updatedValue, values)
    : R.append(updatedValue, values)
  console.log('---2 updated values ', updatedValues)

  return updatedValues
}

export const updateValues = (fra, values, countryIso, year, field, type, value) => dispatch => {
  dispatch(autosave.start)
  const updatedValues = updValue(fra, values, countryIso, year, field, type, value)
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
