// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'

export const stateKey = 'applicationError'

const keys = {
  error: 'error',
}

const getState = R.prop(stateKey)

// === READ
export const getError = R.pipe(getState, R.prop(keys.error))

// === UPDATE
export const assocError = R.assoc(keys.error)
