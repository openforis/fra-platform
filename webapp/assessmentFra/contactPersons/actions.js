import axios from 'axios/index'

import { applicationError } from '../../applicationError/actions'
import * as autosave from '../../autosave/actions'

export const collaboratorsCountryAccessFetch = 'collaborators/countryAccess/fetch'
export const collaboratorsCountryAccessUpdate = 'collaborators/countryAccess/update'

export const fetchCollaboratorsCountryAccess = countryIso => dispatch =>
  axios.get(`/api/collaboratorCountryAccess/${countryIso}/all`)
    .then(resp => dispatch({type: collaboratorsCountryAccessFetch, ...resp.data}))
    .catch(err => dispatch(applicationError(err)))

export const persistCollaboratorCountryAccess = (countryIso, collaboratorCountryAccess) => dispatch => {
  dispatch(autosave.start)
  dispatch({type: collaboratorsCountryAccessUpdate, collaborator: collaboratorCountryAccess})

  dispatch(postCollaboratorCountryAccess(countryIso, collaboratorCountryAccess))
}

const postCollaboratorCountryAccess = (countryIso, collaboratorCountryAccess) => {

  const dispatched = dispatch => {
    axios
      .post(`/api/collaboratorCountryAccess/${countryIso}`, collaboratorCountryAccess)
      .then(() => {
        dispatch(autosave.complete)
      }).catch(err => dispatch(applicationError(err)))
  }

  dispatched.meta = {
    debounce: {
      time: 400,
      key: collaboratorsCountryAccessUpdate
    }
  }
  return dispatched

}
