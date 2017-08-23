import axios from 'axios'
import { applicationError } from '../applicationError/actions'
import * as autosave from '../autosave/actions'

export const valueChangeStart = 'nationalDataEntry/value/change/start'
export const pasteChangeStart = 'nationalDataEntry/value/paste/start'

const changeMany = ({countryIso, columnData}) => {
  const dispatched = dispatch => {
    return axios.post(`/api/eof/${countryIso}`, {columns: columnData}).then(() => {
      dispatch(autosave.complete)
    }).catch((err) => {
      dispatch(applicationError(err))
    })
  }
  return dispatched
}

export const saveMany = (countryIso, columnData) => dispatch => {
  dispatch({type: pasteChangeStart, columnData})
  dispatch(autosave.start)
  dispatch(changeMany({countryIso, columnData}))
}

export const generateFraValuesStart = 'nationalDataEntry/generateFraValues/start'

export const generateFraValues = (countryIso) => dispatch => {
  dispatch({type: generateFraValuesStart})

  axios.post(`/api/country/estimation/generateFraValues/${countryIso}`).then(resp => {
    dispatch(fetch(countryIso))
  })
}
