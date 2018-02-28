import R from 'ramda'

import {
  userLoggedInUserLoaded,
  userLoggedInUserSwitchLanguage,
  userEditUserLoaded,
  userEditUserCompleted
} from './actions'
import {applyReducerFunction} from '../utils/reduxUtils'

const actionHandlers = {
  [userLoggedInUserLoaded]: (state, action) =>
    ({...state, userInfo: action.userInfo, i18n: action.i18n}),
  [userLoggedInUserSwitchLanguage]: (state, action) =>
    ({...state, i18n: action.i18n}),

  // edit user functions
  [userEditUserLoaded]: (state, action) => R.pipe(
    R.assocPath(['editUser', 'user'], action.user),
    R.assocPath(['editUser', 'status'], 'loaded')
  )(state),
  [userEditUserCompleted]: (state, action) =>
    R.assocPath(['editUser', 'status'], 'completed', state)
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
