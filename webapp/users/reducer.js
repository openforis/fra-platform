import * as R from 'ramda'

import { usersFetchCompleted, usersUpdateUserStarted, usersUpdateUserCompleted } from './actions'
import { applyReducerFunction } from '../utils/reduxUtils'

const actionHandlers = {
  [usersFetchCompleted]: (state, action) => action.users,
  [usersUpdateUserStarted]: (state, action) => {
    const user = action.user
    const idx = R.findIndex(R.propEq('id', user.id), state)
    return R.update(idx, user, state)
  }
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
