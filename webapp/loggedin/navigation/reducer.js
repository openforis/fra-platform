import { applyReducerFunction } from '@webapp/utils/reduxUtils'

import * as NavigationState from '@webapp/loggedin/navigation/navigationState'

import { navigationToggleVisible } from './actions'

const actionHandlers = {
  [navigationToggleVisible]: NavigationState.toggleVisible,
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
