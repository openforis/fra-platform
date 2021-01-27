// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'

export const stateKey = 'autosave'

const keys = {
  status: 'status',
  lastSaveTimeStamp: 'lastSaveTimeStamp',
}

export const status = {
  saving: 'saving',
  complete: 'complete',
  lastSaveTimestampReceived: 'lastSaveTimestampReceived',
}

const getState = R.prop(stateKey)

// === READ
export const getStatus = R.pipe(getState, R.propOr(null, keys.status))
export const getLastSaveTimeStamp = R.pipe(getState, R.propOr(null, keys.lastSaveTimeStamp))

// === UPDATE
export const assocStatus = R.assoc(keys.status)
export const assocLastSaveTimeStamp = R.assoc(keys.lastSaveTimeStamp)
