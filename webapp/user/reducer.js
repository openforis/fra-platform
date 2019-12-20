import * as R from 'ramda'

import {
  appUserLogout,
  userLoggedInUserLoaded,
  userLoggedInUserSwitchLanguage,
} from './actions'

import { exportReducer } from '@webapp/utils/reduxUtils'

const actionHandlers = {
  [userLoggedInUserLoaded]: (state, action) =>
    ({ ...state, userInfo: action.userInfo, i18n: action.i18n }),

  [userLoggedInUserSwitchLanguage]: (state, action) =>
    R.pipe(
      R.assoc('i18n', action.i18n),
      R.assocPath(['userInfo', 'lang'], action.i18n.language)
    )(state),

  [appUserLogout]: () => ({}),
}

export default exportReducer(actionHandlers)
