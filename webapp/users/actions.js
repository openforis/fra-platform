import axios from 'axios'
import * as R from 'ramda'

import { applicationError } from '../applicationError/actions'
import * as autosave from '../autosave/actions'

import { newUser, updateUserField, updateListUserField, validateUser } from './users'

export const usersFetch = 'users/fetch'
export const usersListUserUpdate = 'users/list/user/update'
export const usersListUserRemove = 'users/list/user/remove'
export const usersNewUserUpdate = 'users/new/user/update'

// list action creators
export const fetchUsers = countryIso => dispatch =>
  axios.get(`/api/users/${countryIso}`)
    .then(resp => dispatch({type: usersFetch, users: resp.data, newUser: newUser()}))
    .catch(err => dispatch(applicationError(err)))

export const updateUser = (countryIso, userId, field, value) => (dispatch, getState) => {
  const user = updateListUserField(userId, field, value)(getState().users.list)
  dispatch({type: usersListUserUpdate, user})

  if (user.valid) {
    dispatch(autosave.start)
    dispatch(persistUser(countryIso, user))
  }
}

export const persistUser = (countryIso, user, fetch = false) => {
  const dispatched = dispatch => {
    axios.post(`/api/users/${countryIso}`, user)
      .then(() => {
        if (fetch)
          dispatch(fetchUsers(countryIso))
        dispatch(autosave.complete)
      }).catch((err) => {
      dispatch(applicationError(err))
    })
  }

  dispatched.meta = {
    debounce: {
      time: 400,
      key: usersListUserUpdate
    }
  }
  return dispatched
}

export const removeUser = (countryIso, userId) => dispatch => {
  dispatch(autosave.start)
  dispatch({type: usersListUserRemove, userId})

  axios.delete(`/api/users/${countryIso}/${userId}`)
    .then(() => {
      dispatch(autosave.complete)
    }).catch((err) => {
    dispatch(applicationError(err))
  })
}

// new user action creators

export const updateNewUser = (countryIso, userId, field, value) => (dispatch, getState) => {
  const user = updateUserField(field, value)(getState().users.newUser)
  dispatch({type: usersNewUserUpdate, user})
}

export const addNewUser = countryIso => (dispatch, getState) => {
  const user = validateUser(getState().users.newUser)
  if (user.valid) {
    dispatch(autosave.start)
    dispatch(persistUser(countryIso, user, true))
  } else {
    dispatch({type: usersNewUserUpdate, user})
  }
}
