import { exportReducer } from '../../utils/reduxUtils'

import * as UserState from '../../store/user/state'
import * as UserActions from '../../store/user/actions'

const actionHandlers = {
  // TODO: waiting refactor
  'app/init/fulfilled': (state: any, { payload }: any) => {
    return UserState.assocUserInfo(payload.userInfo)(state)
  },

  'app/switchLanguage/fulfilled': (state: any, { payload }: any) => {
    return UserState.assocUserInfoLang(payload.language)(state)
  },

  [UserActions.appUserLogout]: () => ({}),
}

export default exportReducer(actionHandlers)
