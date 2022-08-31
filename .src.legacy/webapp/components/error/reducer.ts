import { applyReducerFunction } from '@webapp/utils/reduxUtils'

import * as ApplicationErrorState from '@webapp/components/error/applicationErrorState'
import { applicationErrorType, clearApplicationErrorType } from './actions'

const actionHandlers = {
  [applicationErrorType]: (state: any, { error }: any) => ApplicationErrorState.assocError(error)(state),
  [clearApplicationErrorType]: (state: any) => ApplicationErrorState.assocError(null)(state),
}

export default (state = {}, action: any) => applyReducerFunction(actionHandlers, state, action)
