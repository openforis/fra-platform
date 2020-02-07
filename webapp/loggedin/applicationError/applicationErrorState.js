import * as R from 'ramda'

export const stateKey = 'app'

const keys = {
  error: 'error',
}

const getState = R.prop(stateKey)

// === READ
export const getError = R.pipe(getState, R.propOr(null, keys.error))

// === UPDATE
export const assocError = R.assoc(keys.error)
