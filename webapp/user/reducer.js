import R from 'ramda'

import {
  userLoggedInUserLoaded,
  userLoggedInUserSwitchLanguage,
  userEditUserLoaded,
  userEditUserCompleted
} from './actions'

import { exportReducer } from '../utils/reduxUtils'

const actionHandlers = {
  [userLoggedInUserLoaded]: (state, action) =>
    ({...state, userInfo: action.userInfo, i18n: action.i18n}),

  [userLoggedInUserSwitchLanguage]: (state, action) =>
    R.pipe(
      R.assoc('i18n', action.i18n),
      R.assocPath(['userInfo', 'lang'], action.i18n.language)
    )(state),

  // edit user functions
  [userEditUserLoaded]: (state, action) => R.pipe(
    R.assocPath(['editUser', 'user'], action.user),
    R.assocPath(['editUser', 'status'], 'loaded')
  )(state),

  [userEditUserCompleted]: (state, action) =>
    R.assocPath(['editUser', 'status'], 'completed', state)
}

export default exportReducer(actionHandlers)
