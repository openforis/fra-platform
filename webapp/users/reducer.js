import * as R from 'ramda'

import { usersFetchCompleted, usersUpdateUserStarted, usersRemoveUserStarted } from './actions'
import { applyReducerFunction } from '../utils/reduxUtils'

const actionHandlers = {
  [usersFetchCompleted]: (state, action) => R.assoc('list', action.users, state),
  [usersUpdateUserStarted]: (state, action) => {
    const user = action.user
    const idx = R.findIndex(R.propEq('id', user.id), state.list)
    return R.assoc('list', R.update(idx, user, state.list), state)
  },
  [usersRemoveUserStarted]: (state, action) => {
    const idx = R.findIndex(R.propEq('id', action.userId), state.list)
    return R.assoc('list', R.remove(idx, 1, state.list), state)
  },
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
