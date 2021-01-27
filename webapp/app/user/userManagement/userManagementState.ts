// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'

export const stateKey = 'userManagement'

const keys = {
  countryUsers: 'countryUsers',
  newUser: 'newUser',
  editUser: 'editUser',
  allUsers: 'allUsers',
  userCounts: 'userCounts',
}

const keysEditUser = {
  user: 'user',
  status: 'status',
}

const getState = R.prop(stateKey)

// === READ
export const getCountryUsers = R.pipe(getState, R.propOr(null, keys.countryUsers))
export const getNewUser = R.pipe(getState, R.propOr(null, keys.newUser))
export const getEditUser = R.pipe(getState, R.propOr(null, keys.editUser))
export const getAllUsers = R.pipe(getState, R.propOr([], keys.allUsers))
export const getUserCounts = R.pipe(getState, R.propOr(null, keys.userCounts))

export const getEditUserStatus = R.pipe(getEditUser, R.prop('status'))

// === UPDATE
export const assocCountryUsers = R.assoc(keys.countryUsers)
export const assocNewUser = R.assoc(keys.newUser)
export const assocEditUser = R.assoc(keys.editUser)
export const assocAllUsers = R.assoc(keys.allUsers)
export const assocUserCounts = R.assoc(keys.userCounts)

// edit user functions
export const assocEditUserUser = R.assocPath([keys.editUser, keysEditUser.user])
export const assocEditUserStatus = R.assocPath([keys.editUser, keysEditUser.status])
