import * as R from 'ramda'

export const stateKey = 'user'

const keys = {
  userInfo: 'userInfo',
  role: 'role',
}

const getState = R.prop(stateKey)

// === READ
export const getUserInfo = R.pipe(getState, R.propOr(null, keys.userInfo))
export const getUserAssesmentRoles = (assessment) => R.pipe(getUserInfo, R.pathOr({}, [keys.role, assessment]))

// === UPDATE
export const assocUserInfo = R.assoc(keys.userInfo)

export const assocUserInfoLang = (lang) => (state) => {
  const userInfo = R.propOr(null, keys.userInfo, state)
  return userInfo ? R.assocPath([keys.userInfo, 'lang'], lang, state) : state
}
