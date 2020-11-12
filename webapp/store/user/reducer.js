import { exportReducer } from '@webapp/utils/reduxUtils'

import { UserState } from '@webapp/store/user'

import { appI18nUpdate, appInitDone } from '@webapp/app/actions'
import { appUserLogout } from '@webapp/store/user/actions'

const actionHandlers = {
  [appInitDone]: (state, { userInfo }) => UserState.assocUserInfo(userInfo)(state),

  [appI18nUpdate]: (state, { i18n }) => UserState.assocUserInfoLang(i18n.language)(state),

  [appUserLogout]: () => ({}),
}

export default exportReducer(actionHandlers)
