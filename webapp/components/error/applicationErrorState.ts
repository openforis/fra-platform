import * as R from 'ramda'

export const stateKey = 'applicationError'

const keys = {
  error: 'error',
}

const getState = R.prop(stateKey)

// === READ
// @ts-ignore
export const getError = (x: any) => R.pipe(getState, R.prop(keys.error))(x)

// === UPDATE
export const assocError = (x: any) => R.assoc(keys.error)(x)
