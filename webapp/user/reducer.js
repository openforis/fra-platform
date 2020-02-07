import * as R from 'ramda'

import {
  appUserLogout,
  userLoggedInUserLoaded,
  userLoggedInUserSwitchLanguage,
} from './actions'

import { exportReducer } from '@webapp/utils/reduxUtils'
import * as UserState from '@webapp/user/userState'

const actionHandlers = {
  [userLoggedInUserLoaded]: (state, { userInfo, i18n }) => R.pipe(
    UserState.assocI18n(i18n),
    UserState.assocUserInfo(userInfo),
  )(state),

  [userLoggedInUserSwitchLanguage]: (state, { i18n }) =>
    R.pipe(
      UserState.assocI18n(i18n),
      UserState.assocUserInfoLang(i18n.language)
    )(state),

  [appUserLogout]: () => ({}),
}

export default exportReducer(actionHandlers)
