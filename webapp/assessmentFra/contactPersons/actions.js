import axios from 'axios/index'

import { applicationError } from '../../applicationError/actions'

export const collaboratorsFetch = 'collaborators/fetch'


export const fetchCollaborators = countryIso => dispatch =>
  axios.get(`/api/collaborators/${countryIso}`)
    .then(resp => dispatch({type: collaboratorsFetch, ...resp.data}))
    .catch(err => dispatch(applicationError(err)))
