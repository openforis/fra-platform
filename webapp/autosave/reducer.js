import * as R from 'ramda'
import { autoSaveStart, autoSaveComplete } from './actions'
import { applyReducerFunction } from '@webapp/utils/reduxUtils'
import { lastSectionUpdateTimestampReceived } from '@webapp/audit/actions'

import { status } from './autosave'

import * as AutosaveState from '@webapp/autosave/autosaveState'

const actionHandlers = {
  [autoSaveStart]: (state) => AutosaveState.assocStatus(status.saving)(state),
  [autoSaveComplete]: (state) => AutosaveState.assocStatus(status.complete)(state),
  [lastSectionUpdateTimestampReceived]: (state, { timeStamp }) => R.pipe(
    AutosaveState.assocStatus(status.lastSaveTimestampReceived),
    AutosaveState.assocLastSaveTimeStamp(timeStamp)
  )(state)
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
