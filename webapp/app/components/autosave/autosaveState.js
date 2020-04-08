import * as R from 'ramda'

export const stateKey = 'autosave'

const keys = {
  status: 'status',
  lastSaveTimeStamp: 'lastSaveTimeStamp',
}

const getState = R.prop(stateKey)

// === READ
export const getStatus = R.pipe(getState, R.propOr(null, keys.status))
export const getLastSaveTimeStamp = R.pipe(getState, R.propOr(null, keys.lastSaveTimeStamp))

// === UPDATE
export const assocStatus = R.assoc(keys.status)
export const assocLastSaveTimeStamp = R.assoc(keys.lastSaveTimeStamp)
