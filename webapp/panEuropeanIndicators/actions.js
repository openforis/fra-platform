import axios from 'axios'
import { applicationError } from '@webapp/loggedin/applicationError/actions'
import * as autosave from '../autosave/actions'

export const uploadedQuestionareInfo = 'panEuropeanIndicators/uploadedQuestionareInfo'

export const uploadQuestionnaire = (countryIso, file) => dispatch => {
  const formData = new FormData()
  formData.append('file', file)

  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }

  dispatch(autosave.start)

  axios
    .post(`/api/panEuropean/${countryIso}/upload`, formData, config)
    .then(() => {
      dispatch(autosave.complete)
      dispatch(getUploadedQuestionareInfo(countryIso))
    })
    .catch(err => dispatch(applicationError(err)))
}

export const deleteQuestionare = (countryIso) => dispatch => {
  dispatch(autosave.start)
  axios
    .delete(`/api/panEuropean/${countryIso}`)
    .then(() => {
      dispatch(autosave.complete)
      dispatch(getUploadedQuestionareInfo(countryIso))
    })
    .catch(err => dispatch(applicationError(err)))
}

export const getUploadedQuestionareInfo = (countryIso) => dispatch => {
 axios
   .get(`/api/panEuropean/${countryIso}/uploadedQuestionareInfo`)
   .then(resp => dispatch({type: uploadedQuestionareInfo, data: resp.data}))
   .catch(err => dispatch(applicationError(err)))
}
