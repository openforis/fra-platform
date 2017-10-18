import axios from 'axios'

import { applicationError } from '../applicationError/actions'

export const usersFetchCompleted = 'users/fetch/completed'

export const fetchUsers = countryIso => dispatch =>
  axios.get(`/api/users/${countryIso}`)
    .then(resp => dispatch({type: usersFetchCompleted, users: resp.data}))
    .catch(err => dispatch(applicationError(err)))
