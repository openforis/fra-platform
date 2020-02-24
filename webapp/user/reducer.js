import { exportReducer } from '@webapp/utils/reduxUtils'

import * as UserState from '@webapp/user/userState'

import { appI18nUpdate, appInitDone } from '@webapp/app/actions'
import { appUserLogout } from '@webapp/user/actions'

const actionHandlers = {
  [appInitDone]: (state, { userInfo }) => UserState.assocUserInfo(userInfo)(state),

  [appI18nUpdate]: (state, { i18n }) => UserState.assocUserInfoLang(i18n.language)(state),

  [appUserLogout]: () => ({}),
}

export default exportReducer(actionHandlers)
