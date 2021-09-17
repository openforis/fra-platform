import { exportReducer } from '@webapp/utils/reduxUtils'

import * as UserState from '@webapp/store/user/state'
import * as UserActions from '@webapp/store/user/actions'

const actionHandlers = {
  'app/init/fulfilled': (state: any, { payload: { userInfo } }: any) => UserState.assocUserInfo(userInfo)(state),
  'app/switchLanguage/fulfilled': (state: any, { payload: { language } }: any) =>
    UserState.assocUserInfoLang(language)(state),

  [UserActions.appUserLogout]: () => ({}),
}

export default exportReducer(actionHandlers)
