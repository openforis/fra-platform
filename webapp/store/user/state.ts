import * as R from 'ramda'

export const stateKey = 'user'

const keys = {
  userInfo: 'userInfo',
  role: 'role',
}

const getState = R.prop(stateKey)

// === READ
// @ts-ignore
export const getUserInfo = (x: any) => R.pipe(getState, R.propOr(null, keys.userInfo))(x)
export const getUserAssesmentRoles = (assessment: any) => R.pipe(getUserInfo, R.pathOr({}, [keys.role, assessment]))

// === UPDATE
export const assocUserInfo = R.assoc(keys.userInfo)

export const assocUserInfoLang = (lang: any) => (state: any) => {
  const userInfo = R.propOr(null, keys.userInfo, state)
  return userInfo ? R.assocPath([keys.userInfo, 'lang'], lang, state) : state
}
