// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'

export const stateKey = 'user'

const keys = {
  userInfo: 'userInfo',
  role: 'role',
}

const getState = R.prop(stateKey)

// === READ
export const getUserInfo = R.pipe(getState, R.propOr(null, keys.userInfo))
export const getUserAssesmentRoles = (assessment: any) => R.pipe(getUserInfo, R.pathOr({}, [keys.role, assessment]))

// === UPDATE
export const assocUserInfo = R.assoc(keys.userInfo)

export const assocUserInfoLang = (lang: any) => (state: any) => {
  const userInfo = R.propOr(null, keys.userInfo, state)
  return userInfo ? R.assocPath([keys.userInfo, 'lang'], lang, state) : state
}
