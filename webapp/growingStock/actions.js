import axios from 'axios'
import * as R from 'ramda'

import { applicationError } from '../applicationError/actions'
import * as autosave from '../autosave/actions'

export const growingStockFetchCompleted = 'growingStock/fetch/completed'

export const fetch = countryIso => dispatch =>
  axios
    .get(`/api/growingStock/${countryIso}`)
    .then(resp => dispatch({type: growingStockFetchCompleted, data: resp.data}))
    .catch(err => dispatch(applicationError(err)))


export const growingStockUpdateCompleted = 'growingStock/update/completed'

export const updateValue = (countryIso, year, field, type, value) => dispatch => {
  dispatch({type: growingStockUpdateCompleted})
  console.log(countryIso, year, field, type, value)

}
