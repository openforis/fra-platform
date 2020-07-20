import { applicationErrorType, clearApplicationErrorType } from './actions'
import { applyReducerFunction } from '@webapp/utils/reduxUtils'

import * as ApplicationErrorState from '@webapp/components/error/applicationErrorState'

const actionHandlers = {
  [applicationErrorType]: (state, { error }) => ApplicationErrorState.assocError(error)(state),
  [clearApplicationErrorType]: (state) => ApplicationErrorState.assocError(null)(state),
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
