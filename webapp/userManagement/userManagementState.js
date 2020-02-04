import * as R from 'ramda'

export const stateKey = 'userManagement'

const keys = {
  countryUsers: 'countryUsers',
  newUser: 'newUser',
  editUser: 'editUser',
}

const getState = R.prop(stateKey)

// === READ
export const getCountryUsers = R.pipe(getState, R.propOr(null, keys.countryUsers))
export const getNewUser = R.pipe(getState, R.propOr(null, keys.newUser))
export const getEditUser = R.pipe(getState, R.propOr(null, keys.editUser))

// === UPDATE
export const assocCountryUsers = R.assoc(keys.countryUsers)
export const assocNewUser = R.assoc(keys.newUser)
export const assocEditUser = R.assoc(keys.editUser)
