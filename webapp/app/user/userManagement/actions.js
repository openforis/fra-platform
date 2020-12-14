import axios from 'axios'
import * as R from 'ramda'

import { applicationError } from '@webapp/components/error/actions'
import { newUser, updateUserField, validUser } from './userManagement'
import * as autosave from '../../components/autosave/actions'

export const userManagementCountryUsersFetch = 'userManagement/countryUsers/fetch'
export const userManagementAllUsersFetch = 'userManagement/all/fetch'
export const userManagementNewUserUpdate = 'userManagement/newUser/update'
export const userManagementCollaboratorTableAccessUpdate = 'userManagement/tableAccess/update'

// list action creators

export const fetchUsers = (countryIso, printView = false) => (dispatch) =>
  axios
    .get(`/api/users/${countryIso}?print=${printView}`)
    .then((resp) => dispatch({ type: userManagementCountryUsersFetch, ...resp.data, newUser: newUser() }))
    .catch((err) => dispatch(applicationError(err)))

export const fetchAllUsers = () => (dispatch) =>
  axios
    .get(`/api/users`)
    .then((resp) => dispatch({ type: userManagementAllUsersFetch, ...resp.data }))
    .catch((err) => dispatch(applicationError(err)))

export const removeUser = (countryIso, user, fetchAll = false) => (dispatch) => {
  const queryParam = user.id ? `?id=${user.id}` : `?invitationUuid=${user.invitationUuid}`
  axios
    .delete(`/api/users/${countryIso}/${queryParam}`)
    .then(() => {
      if (fetchAll) {
        dispatch(fetchAllUsers())
      } else {
        dispatch(fetchUsers(countryIso))
      }
    })
    .catch((err) => {
      dispatch(applicationError(err))
    })
}

export const sendInvitationEmail = (countryIso, invitationUuid) => (dispatch) =>
  axios
    .get(`/api/users/${countryIso}/invitations/${invitationUuid}/send`)
    .catch((err) => dispatch(applicationError(err)))

const postCollaboratorCountryAccess = (countryIso, userId, tables) => {
  const dispatched = (dispatch) => {
    axios
      .post(`/api/collaboratorCountryAccess/${countryIso}`, { userId, tables })
      .then(() => {
        dispatch(autosave.complete)
      })
      .catch((err) => dispatch(applicationError(err)))
  }

  dispatched.meta = {
    debounce: {
      time: 400,
      key: userManagementCollaboratorTableAccessUpdate,
    },
  }
  return dispatched
}
// collaborator table access

export const persistCollaboratorCountryAccess = (countryIso, userId, tables) => (dispatch) => {
  dispatch(autosave.start)
  dispatch({ type: userManagementCollaboratorTableAccessUpdate, userId, tables })
  dispatch(postCollaboratorCountryAccess(countryIso, userId, tables))
}

// new user action creators

export const updateNewUser = (countryIso, userId, field, value) => (dispatch, getState) => {
  const user = updateUserField(field, value)(getState().userManagement.newUser)
  dispatch({ type: userManagementNewUserUpdate, user })
}

export const addNewUser = (countryIso) => (dispatch, getState) => {
  const user = getState().userManagement.newUser

  if (!validUser(user)) throw Error('User not valid')

  axios
    .post(`/api/users/${countryIso}`, user)
    .then(() => dispatch(fetchUsers(countryIso)))
    .catch((err) => dispatch(applicationError(err)))
}

// editUser action creators

export const userManagementEditUserLoad = 'userManagement/editUser/loaded'
export const userManagementEditUserComplete = 'userManagement/editUser/completed'

export const loadUserToEdit = (userId) => async (dispatch) => {
  if (Number(userId) > 0) {
    try {
      const {
        data: { user },
      } = await axios.get(`/api/users/user/${userId}`)
      dispatch({ type: userManagementEditUserLoad, user })
    } catch (err) {
      dispatch(applicationError(err))
    }
  }
}

export const persistUser = (countryIso, user) => async (dispatch) => {
  const formData = new FormData()
  formData.append('profilePicture', user.profilePicture)
  formData.append('user', JSON.stringify(R.dissoc('profilePicture', user)))
  formData.append('countryIso', countryIso)

  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  }

  dispatch(autosave.start)
  try {
    await axios.put(`/api/users/user/`, formData, config)
    dispatch(autosave.complete)
    dispatch({ type: userManagementEditUserComplete })
  } catch (err) {
    dispatch(applicationError(err))
  }
}
