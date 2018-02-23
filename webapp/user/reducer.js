import R from 'ramda'

import { userLoggedInUserLoaded, userLoggedInUserSwitchLanguage, userEditUserLoaded } from './actions'
import { applyReducerFunction } from '../utils/reduxUtils'

const actionHandlers = {
  [userLoggedInUserLoaded]: (state, action) =>
    ({...state, userInfo: action.userInfo, i18n: action.i18n}),
  [userLoggedInUserSwitchLanguage]: (state, action) =>
    ({...state, i18n: action.i18n}),
  [userEditUserLoaded]: (state, action) =>
    R.assocPath(['editUser', 'user'], action.user)(state)
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
