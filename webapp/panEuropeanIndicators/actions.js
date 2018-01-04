import axios from 'axios'
import { applicationError } from '../applicationError/actions'
import * as autosave from '../autosave/actions'

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
    .post(`/api/panEuropean/upload/${countryIso}`, formData, config)
    .then(() => {
      console.log('aaaa')
      dispatch(autosave.complete)
    })
    .catch(err => dispatch(applicationError(err)))
}
