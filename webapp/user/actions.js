import axios from 'axios'
import R from 'ramda'

import {applicationError} from '../applicationError/actions'
import {createI18nInstance} from '../../common/i18n/i18nFactory'
import * as autosave from "../autosave/actions"

export const userLoggedInUserLoaded = 'user/loggedInUser/loaded'
export const userLoggedInUserSwitchLanguage = 'user/loggedInUser/switchLanguage'

// logged in user action creators

export const getLoggedinUserInfo = () => dispatch => {
  axios.get(`/api/loggedInUser/`)
    .then(resp => {
      const userInfo = resp.data.userInfo
      createI18nInstance(
        userInfo.lang,
        i18n => dispatch({type: userLoggedInUserLoaded, userInfo, i18n})
      )
    })
    .catch((err) => {
      dispatch(applicationError(err))
    })
}

export const switchLanguage = lang => dispatch => {
  axios
    .post(`/api/user/lang?lang=${lang}`)
    .catch(err => dispatch(applicationError(err)))

  createI18nInstance(
    lang,
    i18n => dispatch({type: userLoggedInUserSwitchLanguage, i18n})
  )
}

export const logout = () => dispatch => {
  axios.post(`/auth/logout`)
    .then(() => {
      window.location = '/login'
    })
    .catch((err) => {
      dispatch(applicationError(err))
    })
}

//editUser action creators

export const userEditUserLoaded = 'user/editUser/loaded'

export const loadUserToEdit = (countryIso, userId) => dispatch => {
  if (Number(userId) > 0) {
    axios
      .get(`/api/users/${countryIso}/user/edit/${userId}`)
      .then(resp => {
        const user = resp.data.user
        dispatch({type: userEditUserLoaded, user})
      })
      .catch(err => dispatch(applicationError(err)))
  }
}

export const persistUser = (countryIso, user) => dispatch => {
  const formData = new FormData()
  formData.append('profilePicture', user.profilePicture)
  formData.append('user', JSON.stringify(R.dissoc('profilePicture',user)))

  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }

  dispatch(autosave.start)

  axios
    .post(`/api/users/${countryIso}/user/edit`, formData, config)
    .then(() => {
      dispatch(autosave.complete)
      // window.history.back()
    })
    .catch(err => dispatch(applicationError(err)))

}
