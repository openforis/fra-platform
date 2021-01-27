// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
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
export const getDynamicTarget = (target: any) => R.pipe(getState, R.prop(target))

// === UPDATE
export const assocDynamicTarget = (target: any) => R.assoc(target)
export const assocOpenThread = R.assoc(keys.openThread)
export const assocStatus = R.assoc(keys.status)
export const omitOpenThread = R.omit([keys.openThread])
