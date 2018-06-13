import axios from 'axios'

import { applicationError } from '../../../applicationError/actions'
import { newUser, updateUserField, validUser } from './users'

export const usersFetch = 'users/fetch'
export const usersAllFetch = 'users/all/fetch'
export const usersNewUserUpdate = 'users/new/user/update'

// list action creators

export const fetchUsers = countryIso => dispatch =>
  axios.get(`/api/users/${countryIso}`)
    .then(resp => dispatch({type: usersFetch, ...resp.data, newUser: newUser()}))
    .catch(err => dispatch(applicationError(err)))

export const fetchAllUsers = countryIso => dispatch =>
  axios.get(`/api/users/${countryIso}`)
    .then(resp => dispatch({type: usersAllFetch, ...resp.data}))
    .catch(err => dispatch(applicationError(err)))

export const removeUser = (countryIso, user) => dispatch => {
  const queryParam = user.id ? `?id=${user.id}` : `?invitationUuid=${user.invitationUuid}`
  axios.delete(`/api/users/${countryIso}/${queryParam}`)
    .then(() => {
      dispatch(fetchUsers(countryIso))
    }).catch((err) => {
    dispatch(applicationError(err))
  })
}

export const sendInvitationEmail = (countryIso, invitationUuid) => dispatch =>
  axios
    .get(`/api/users/${countryIso}/invitations/${invitationUuid}/send`)
    .catch(err => dispatch(applicationError(err)))

// new user action creators

export const updateNewUser = (countryIso, userId, field, value) => (dispatch, getState) => {
  const user = updateUserField(field, value)(getState().userManagement.newUser)
  dispatch({type: usersNewUserUpdate, user})
}

export const addNewUser = countryIso => (dispatch, getState) => {
  const user = getState().userManagement.newUser

  if (!validUser(user))
    throw Error('User not valid')

  axios.post(`/api/users/${countryIso}`, user)
    .then(() => dispatch(fetchUsers(countryIso)))
    .catch(err => dispatch(applicationError(err)))

}
