import { exportReducer } from '@webapp/utils/reduxUtils'

import * as UserState from '@webapp/store/user/state'
import * as UserActions from '@webapp/store/user/actions'

import { appI18nUpdate, appInitDone } from '@webapp/store/app/actions'

const actionHandlers = {
  [appInitDone]: (state, { userInfo }) => UserState.assocUserInfo(userInfo)(state),

  [appI18nUpdate]: (state, { i18n }) => UserState.assocUserInfoLang(i18n.language)(state),

  [UserActions.appUserLogout]: () => ({}),
}

export default exportReducer(actionHandlers)
