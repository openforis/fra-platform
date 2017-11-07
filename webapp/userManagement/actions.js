import axios from 'axios'
import * as R from 'ramda'

import { applicationError } from '../applicationError/actions'
import { newUser, updateUserField, updateListUserField, validUser } from './users'

export const usersFetch = 'users/fetch'
export const usersListUserUpdate = 'users/list/user/update'
export const usersNewUserUpdate = 'users/new/user/update'

// list action creators
export const fetchUsers = countryIso => dispatch =>
  axios.get(`/api/users/${countryIso}`)
    .then(resp => dispatch({type: usersFetch, users: resp.data, newUser: newUser()}))
    .catch(err => dispatch(applicationError(err)))

export const updateUser = (countryIso, userId, field, value) => (dispatch, getState) => {
  const user = updateListUserField(userId, field, value)(getState().userManagement.list)
  dispatch({type: usersListUserUpdate, user})
}

export const persistUser = (countryIso, user, fetch = false) => dispatch => {
  if (!validUser(user)) throw Error('User not valid')
  axios.post(`/api/users/${countryIso}`, user)
    .then(() => {
      if (fetch)
        dispatch(fetchUsers(countryIso))
    }).catch((err) => {
    dispatch(applicationError(err))
  })
}

export const removeUser = (countryIso, user) => dispatch => {
  const queryParam = user.id ? `?id=${user.id}` : `?invitationUuid=${user.invitationUuid}`
  axios.delete(`/api/users/${countryIso}/${queryParam}`)
    .then(() => {
      dispatch(fetchUsers(countryIso))
    }).catch((err) => {
    dispatch(applicationError(err))
  })
}

// new user action creators

export const updateNewUser = (countryIso, userId, field, value) => (dispatch, getState) => {
  const user = updateUserField(field, value)(getState().userManagement.newUser)
  dispatch({type: usersNewUserUpdate, user})
}

export const addNewUser = countryIso => (dispatch, getState) => {
  const user = getState().userManagement.newUser
  dispatch(persistUser(countryIso, user, true))
}
