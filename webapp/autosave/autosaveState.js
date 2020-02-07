import * as R from 'ramda'

export const stateKey = 'autosave'

const keys = {
  status: 'status',
}

const getState = R.prop(stateKey)

// === READ
export const getStatus = R.pipe(getState, R.propOr(null, keys.status))

// === UPDATE
export const assocStatus = R.assoc(keys.status)
