import axios from 'axios'
import * as R from 'ramda'

import { applicationError } from '../applicationError/actions'
import * as autosave from '../autosave/actions'

export const usersFetchCompleted = 'users/fetch/completed'
export const usersUpdateUserStarted = 'users/updateUser/started'
export const usersUpdateUserCompleted = 'users/updateUser/completed'

export const fetchUsers = countryIso => dispatch =>
  axios.get(`/api/users/${countryIso}`)
    .then(resp => dispatch({type: usersFetchCompleted, users: resp.data}))
    .catch(err => dispatch(applicationError(err)))

// const update
export const updateUser = (countryIso, userId, field, value) => (dispatch, getState) => {
  dispatch(autosave.start)

  const user = R.pipe(
    R.find(R.propEq('id', userId)),
    R.assoc(field, value)
  )(getState().users)

  dispatch({type: usersUpdateUserStarted, user})
  dispatch(persistUser(countryIso, user))
}

export const persistUser = (countryIso, user) => {
  const dispatched = dispatch => {
    axios.post(`/api/users/${countryIso}`, user)
      .then((resp) => {
        dispatch(autosave.complete)
        dispatch(dispatch({type: usersUpdateUserCompleted}))
      }).catch((err) => {
      dispatch(applicationError(err))
    })
  }

  dispatched.meta = {
    debounce: {
      time: 400,
      key: usersUpdateUserStarted
    }
  }
  return dispatched
}
