import * as R from 'ramda'

import {
  usersFetch,
  usersListUserUpdate,
  usersNewUserUpdate
} from './actions'
import { applyReducerFunction } from '../../../utils/reduxUtils'

const sortUsers = users => R.sortBy(R.compose(R.toLower, R.prop('name')), users)

const actionHandlers = {
  //users list
  [usersFetch]: (state, action) => R.pipe(
    R.assoc('countryUsers', sortUsers(action.countryUsers)),
    R.assoc('allUsers', sortUsers(action.allUsers)),
    R.assoc('userCounts', action.userCounts),
    R.assoc('newUser', action.newUser),
  )(state),

  // new user
  [usersNewUserUpdate]: (state, action) => R.assoc('newUser', action.user, state)
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
