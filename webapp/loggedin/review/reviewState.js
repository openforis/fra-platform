import * as R from 'ramda'

export const stateKey = 'review'

const keys = {
  openThread: 'openThread',
  status: 'status',
  target: 'target',
}

const getState = R.prop(stateKey)

// === READ
// openThread = { target: [], section: '' },
export const getOpenThread = R.pipe(getState, R.prop(keys.openThread))
export const getOpenThreadTarget = R.pipe(getOpenThread, R.propOr([], keys.target))
export const getDynamicTarget = target => R.pipe(getState, R.prop(target))

// === UPDATE
export const assocDynamicTarget = target => R.assoc(target)
export const assocOpenThread = R.assoc(keys.openThread)
export const assocStatus = R.assoc(keys.status)
export const omitOpenThread = R.omit([keys.openThread])
