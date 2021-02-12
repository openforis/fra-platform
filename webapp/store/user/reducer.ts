import { exportReducer } from '@webapp/utils/reduxUtils'

import * as UserState from '@webapp/store/user/state'
import * as UserActions from '@webapp/store/user/actions'

import ActionTypes from '@webapp/store/app/actions/actionTypes'

const actionHandlers = {
  [ActionTypes.appInitDone]: (state: any, { userInfo }: any) => UserState.assocUserInfo(userInfo)(state),

  [ActionTypes.appI18nUpdate]: (state: any, { i18n }: any) => UserState.assocUserInfoLang(i18n.language)(state),

  [UserActions.appUserLogout]: () => ({}),
}

export default exportReducer(actionHandlers)
