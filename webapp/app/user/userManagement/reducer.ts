import * as R from 'ramda'

import { applyReducerFunction } from '@webapp/utils/reduxUtils'

import * as UserManagementState from '@webapp/app/user/userManagement/userManagementState'
import {
  userManagementCountryUsersFetch,
  userManagementCollaboratorTableAccessUpdate,
  userManagementAllUsersFetch,
  userManagementNewUserUpdate,
  userManagementEditUserLoad,
  userManagementEditUserComplete,
} from './actions'

const sortUsers = (users: any) => R.sortBy(R.compose(R.toLower, R.prop('name')), users)

const actionHandlers = {
  // users list
  [userManagementCountryUsersFetch]: (state: any, { countryUsers, newUser }: any) =>
    R.pipe(
      UserManagementState.assocCountryUsers(sortUsers(countryUsers)),
      UserManagementState.assocNewUser(newUser)
    )(state),

  [userManagementAllUsersFetch]: (state: any, { allUsers, userCounts }: any) =>
    R.pipe(
      UserManagementState.assocAllUsers(sortUsers(allUsers)),
      UserManagementState.assocUserCounts(userCounts)
    )(state),

  // collaborator table access update
  [userManagementCollaboratorTableAccessUpdate]: (state: any, action: any) => {
    const idx = R.findIndex(R.propEq('id', action.userId), state.countryUsers)
    return R.assocPath(['countryUsers', idx, 'tables'], action.tables, state)
  },

  // new user
  [userManagementNewUserUpdate]: (state: any, { user }: any) => UserManagementState.assocNewUser(user)(state),

  // edit user functions
  [userManagementEditUserLoad]: (state: any, { user }: any) =>
    // @ts-ignore
    R.pipe(UserManagementState.assocEditUserUser(user), UserManagementState.assocEditUserStatus('loaded'))(state),

  [userManagementEditUserComplete]: (state: any, action: any) =>
    UserManagementState.assocEditUserStatus('completed')(state),
}

export default (state = {}, action: any) => applyReducerFunction(actionHandlers, state, action)
