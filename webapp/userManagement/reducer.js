import * as R from 'ramda'

import {
  userManagementCountryUsersFetch,
  userManagementAllUsersFetch,
  userManagementNewUserUpdate,
  userManagementEditUserLoad,
  userManagementEditUserComplete
} from './actions'

import { applyReducerFunction } from '../utils/reduxUtils'

const sortUsers = users => R.sortBy(R.compose(R.toLower, R.prop('name')), users)

const actionHandlers = {
  //users list
  [userManagementCountryUsersFetch]: (state, action) => R.pipe(
    R.assoc('countryUsers', sortUsers(action.countryUsers)),
    R.assoc('newUser', action.newUser),
  )(state),

  [userManagementAllUsersFetch]: (state, action) => R.pipe(
    R.assoc('allUsers', sortUsers(action.allUsers)),
    R.assoc('userCounts', action.userCounts),
  )(state),

  // new user
  [userManagementNewUserUpdate]: (state, action) => R.assoc('newUser', action.user, state),

  // edit user functions
  [userManagementEditUserLoad]: (state, action) => R.pipe(
    R.assocPath(['editUser', 'user'], action.user),
    R.assocPath(['editUser', 'status'], 'loaded')
  )(state),

  [userManagementEditUserComplete]: (state, action) =>
    R.assocPath(['editUser', 'status'], 'completed', state)
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
