import axios from 'axios'
import * as R from 'ramda'

import { applicationError } from '@webapp/components/error/actions'
import { ApiEndPoint } from '@common/api/endpoint'
import { AutosaveActions } from '@webapp/store/autosave'
import { newUser, updateUserField, validUser } from './userManagement'

export const userManagementCountryUsersFetch = 'userManagement/countryUsers/fetch'
export const userManagementAllUsersFetch = 'userManagement/all/fetch'
export const userManagementNewUserUpdate = 'userManagement/newUser/update'
export const userManagementCollaboratorTableAccessUpdate = 'userManagement/tableAccess/update'

// list action creators

export const fetchUsers =
  (countryIso: any, printView = false) =>
  (dispatch: any) =>
    axios
      .get(`/api/users/${countryIso}?print=${printView}`)
      .then((resp) => dispatch({ type: userManagementCountryUsersFetch, ...resp.data, newUser: newUser() }))
      .catch((err) => dispatch(applicationError(err)))

export const fetchAllUsers = () => (dispatch: any) =>
  axios
    .get(`/api/users`)
    .then((resp) => dispatch({ type: userManagementAllUsersFetch, ...resp.data }))
    .catch((err) => dispatch(applicationError(err)))

export const removeUser =
  (countryIso: any, user: any, fetchAll = false) =>
  (dispatch: any) => {
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

export const sendInvitationEmail = (countryIso: any, invitationUuid: any) => (dispatch: any) =>
  axios
    .get(`/api/users/${countryIso}/invitations/${invitationUuid}/send`)
    .catch((err) => dispatch(applicationError(err)))

const postCollaboratorCountryAccess = (countryIso: any, userId: any, tables: any) => {
  const dispatched = (dispatch: any) => {
    axios
      .post(ApiEndPoint.Collaborators.create(countryIso), { userId, tables })
      .then(() => {
        dispatch(AutosaveActions.autoSaveComplete())
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

export const persistCollaboratorCountryAccess = (countryIso: any, userId: any, tables: any) => (dispatch: any) => {
  dispatch(AutosaveActions.autoSaveStart())
  dispatch({ type: userManagementCollaboratorTableAccessUpdate, userId, tables })
  dispatch(postCollaboratorCountryAccess(countryIso, userId, tables))
}

// new user action creators

export const updateNewUser =
  (countryIso: any, userId: any, field: any, value: any) => (dispatch: any, getState: any) => {
    const user = updateUserField(field, value)(getState().userManagement.newUser)
    dispatch({ type: userManagementNewUserUpdate, user })
  }

export const addNewUser = (countryIso: any) => (dispatch: any, getState: any) => {
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

export const loadUserToEdit = (userId: any) => async (dispatch: any) => {
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

export const persistUser = (countryIso: any, user: any) => async (dispatch: any) => {
  const formData = new FormData()
  formData.append('profilePicture', user.profilePicture)
  formData.append('user', JSON.stringify(R.dissoc('profilePicture', user)))
  formData.append('countryIso', JSON.stringify(countryIso))

  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  }

  dispatch(AutosaveActions.autoSaveStart())
  try {
    await axios.put(`/api/users/user/`, formData, config)
    dispatch(AutosaveActions.autoSaveComplete())
    dispatch({ type: userManagementEditUserComplete })
  } catch (err) {
    dispatch(applicationError(err))
  }
}
