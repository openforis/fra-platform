// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'

import { exportReducer } from '@webapp/utils/reduxUtils'

import {
  loginInitLoaded,
  loginUserPropChanged,
  localLoginResponseLoaded,
  localLoginResetPasswordResponseLoaded,
  resetPasswordLoaded,
  changePasswordResponseLoaded,
} from './actions'

const actionHandlers = {
  [loginInitLoaded]: (state: any, action: any) =>
    R.pipe(
      R.assocPath(['login', 'status'], 'loaded'),
      R.assocPath(['login', 'invitation'], action.invitation),
      R.assocPath(['login', 'user'], action.user)
    )(state),

  [loginUserPropChanged]: (state: any, action: any) =>
    R.pipe(R.assocPath(['login', 'user', action.prop], action.value))(state),

  [localLoginResponseLoaded]: (state: any, action: any) =>
    R.assocPath(['localLogin', 'message'], action.message, state),

  [localLoginResetPasswordResponseLoaded]: (state: any, action: any) =>
    R.pipe(
      R.assocPath(['localLogin', 'resetPassword', 'message'], action.message),
      R.assocPath(['localLogin', 'resetPassword', 'error'], action.error)
    )(state),

  [resetPasswordLoaded]: (state: any, action: any) =>
    R.pipe(
      R.assocPath(['resetPassword', 'status'], action.status),
      R.assocPath(['resetPassword', 'data'], action.resetPassword)
    )(state),

  [changePasswordResponseLoaded]: (state: any, action: any) =>
    R.pipe(
      R.assocPath(['changePassword', 'message'], action.message),
      R.assocPath(['changePassword', 'error'], action.error)
    )(state),
}

export default exportReducer(actionHandlers)
