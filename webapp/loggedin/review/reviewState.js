import * as R from 'ramda'

export const stateKey = 'review'

const keys = {
  openThread: 'openThread',
}

const getState = R.prop(stateKey)

// === READ
// openThread = { target: [], section: '' },
export const getOpenThread = R.pipe(getState, R.prop( keys.openThread))
export const getOpenThreadTarget = R.pipe(getState, R.pathOr([], ['openThread', 'target']))

// === UPDATE
export const assocOpenThread = R.assoc(keys.openThread)
