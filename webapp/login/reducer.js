import * as R from 'ramda'

import { exportReducer } from '@webapp/utils/reduxUtils'

import {
  loginInitLoaded,
  loginUserPropChanged,
  localLoginResponseLoaded,
  localLoginResetPasswordResponseLoaded,
  resetPasswordLoaded,
  changePasswordResponseLoaded
} from './actions'

const actionHandlers = {

  [loginInitLoaded]: (state, action) => R.pipe(
    R.assocPath(['login', 'status'], 'loaded'),
    R.assocPath(['login', 'invitation'], action.invitation),
    R.assocPath(['login', 'user'], action.user)
  )(state),

  [loginUserPropChanged]: (state, action) => R.pipe(
    R.assocPath(['login', 'user', action.prop], action.value)
  )(state),

  [localLoginResponseLoaded]: (state, action) =>
    R.assocPath(['localLogin', 'message'], action.message, state),

  [localLoginResetPasswordResponseLoaded]: (state, action) => R.pipe(
    R.assocPath(['localLogin', 'resetPassword', 'message'], action.message),
    R.assocPath(['localLogin', 'resetPassword', 'error'], action.error)
  )(state),

  [resetPasswordLoaded]: (state, action) => R.pipe(
    R.assocPath(['resetPassword', 'status'], action.status),
    R.assocPath(['resetPassword', 'data'], action.resetPassword)
  )(state),

  [changePasswordResponseLoaded]: (state, action) => R.pipe(
    R.assocPath(['changePassword', 'message'], action.message),
    R.assocPath(['changePassword', 'error'], action.error)
  )(state)
}

export default exportReducer(actionHandlers)
