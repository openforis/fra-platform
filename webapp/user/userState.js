import * as R from 'ramda'

import * as AppState from '@webapp/app/appState'

export const stateKey = 'user'

const keys = {
  userInfo: 'userInfo',
}

const getState = R.prop(stateKey)

// === READ
export const getUserInfo = R.pipe(getState, R.propOr(null, keys.userInfo))

// === UPDATE
export const assocUserInfo = R.assoc(keys.userInfo)
export const assocUserInfoLang = lang => state => {
  const userInfo = R.propOr(null, keys.userInfo, state)
  return userInfo
    ? R.assocPath([keys.userInfo, 'lang'], lang, state)
    : state
}
