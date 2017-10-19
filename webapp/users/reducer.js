import * as R from 'ramda'

import {
  usersFetch,
  usersListUserUpdate,
  usersListUserRemove,
  usersNewUserUpdate
} from './actions'
import { applyReducerFunction } from '../utils/reduxUtils'

const actionHandlers = {
  //users list
  [usersFetch]: (state, action) => R.pipe(
    R.assoc('list', action.users),
    R.assoc('newUser', action.newUser)
  )(state),

  [usersListUserUpdate]: (state, action) => {
    const user = action.user
    const idx = R.findIndex(R.propEq('id', user.id), state.list)
    return R.assoc('list', R.update(idx, user, state.list), state)
  },

  [usersListUserRemove]: (state, action) => {
    const idx = R.findIndex(R.propEq('id', action.userId), state.list)
    return R.assoc('list', R.remove(idx, 1, state.list), state)
  },

  // new user
  [usersNewUserUpdate]: (state, action) => R.assoc('newUser', action.user, state),
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
