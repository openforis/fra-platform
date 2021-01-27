import * as R from 'ramda'

import {
  userManagementCountryUsersFetch,
  userManagementCollaboratorTableAccessUpdate,
  userManagementAllUsersFetch,
  userManagementNewUserUpdate,
  userManagementEditUserLoad,
  userManagementEditUserComplete
} from './actions'

import { applyReducerFunction } from '@webapp/utils/reduxUtils'

import * as UserManagementState from '@webapp/app/user/userManagement/userManagementState'

const sortUsers = users => R.sortBy(R.compose(R.toLower, R.prop('name')), users)

const actionHandlers = {
  //users list
  [userManagementCountryUsersFetch]: (state, { countryUsers, newUser }) => R.pipe(
    UserManagementState.assocCountryUsers(sortUsers(countryUsers)),
    UserManagementState.assocNewUser(newUser),
  )(state),

  [userManagementAllUsersFetch]: (state, { allUsers, userCounts }) => R.pipe(
    UserManagementState.assocAllUsers(sortUsers(allUsers)),
    UserManagementState.assocUserCounts(userCounts),
  )(state),

  // collaborator table access update
  [userManagementCollaboratorTableAccessUpdate]: (state, action) => {
    const idx = R.findIndex(R.propEq('id', action.userId), state.countryUsers)
    return R.assocPath(['countryUsers', idx, 'tables'], action.tables, state)
  },

  // new user
  [userManagementNewUserUpdate]: (state, { user }) => UserManagementState.assocNewUser(user)(state),


  // edit user functions
  [userManagementEditUserLoad]: (state, { user }) => R.pipe(
    UserManagementState.assocEditUserUser(user),
    UserManagementState.assocEditUserStatus('loaded')
  )(state),

  [userManagementEditUserComplete]: (state, action) => UserManagementState.assocEditUserStatus('completed')(state)
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
