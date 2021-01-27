// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'
import { exportReducer } from '@webapp/utils/reduxUtils'
import {
  lastSectionUpdateTimestampReceived,
  lastSectionUpdateTimestampReset,
} from '@webapp/app/components/audit/actions'

import * as AutosaveState from './autosaveState'
import { autoSaveStart, autoSaveComplete } from './actions'

const actionHandlers = {
  [autoSaveStart]: (state: any) => AutosaveState.assocStatus(AutosaveState.status.saving)(state),
  [autoSaveComplete]: (state: any) => AutosaveState.assocStatus(AutosaveState.status.complete)(state),

  [lastSectionUpdateTimestampReceived]: (state: any, { timeStamp }: any) =>
    R.pipe(
      AutosaveState.assocStatus(AutosaveState.status.lastSaveTimestampReceived),
      AutosaveState.assocLastSaveTimeStamp(timeStamp)
    )(state),

  [lastSectionUpdateTimestampReset]: (state: any) =>
    R.pipe(AutosaveState.assocStatus(null), AutosaveState.assocLastSaveTimeStamp(null))(state),
}

export default exportReducer(actionHandlers)
