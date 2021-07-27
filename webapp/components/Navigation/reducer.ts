import { applyReducerFunction } from '@webapp/utils/reduxUtils'

import * as NavigationState from '@webapp/components/Navigation/navigationState'

import { navigationToggleVisible } from './actions'

const actionHandlers = {
  [navigationToggleVisible]: NavigationState.toggleVisible,
}

export default (state = {}, action: any) => applyReducerFunction(actionHandlers, state, action)
