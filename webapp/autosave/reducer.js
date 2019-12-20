import { autoSaveStart, autoSaveComplete } from './actions'
import { applyReducerFunction } from '@webapp/utils/reduxUtils'
import { lastSectionUpdateTimestampReceived } from '@webapp/audit/actions'

import { status } from './autosave'

const actionHandlers = {
  [autoSaveStart]: (state) => ({ ...state, status: status.saving }),
  [autoSaveComplete]: (state) => ({ ...state, status: status.complete }),
  [lastSectionUpdateTimestampReceived]: (state, action) =>
    ({ ...state, status: 'lastSaveTimestampReceived', lastSaveTimeStamp: action.timeStamp })
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
