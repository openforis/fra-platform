import { exportReducer } from '@webapp/utils/reduxUtils'

import * as UserState from '@webapp/store/user/state'
import * as UserActions from '@webapp/store/user/actions'

const actionHandlers = {
  // TODO: waiting refactor
  'app/init/fulfilled': (state: any, { userInfo }: any) => UserState.assocUserInfo(userInfo)(state),

  'app/switchLanguage/fulfilled': (state: any, { i18n }: any) => UserState.assocUserInfoLang(i18n.language)(state),

  [UserActions.appUserLogout]: () => ({}),
}

export default exportReducer(actionHandlers)
