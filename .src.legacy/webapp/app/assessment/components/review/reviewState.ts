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
// @ts-ignore
export const getOpenThread = (state: any) => R.pipe(getState, R.prop(keys.openThread))(state)
// @ts-ignore
export const getOpenThreadTarget = R.pipe(getOpenThread, R.propOr([], keys.target))
// @ts-ignore
export const getDynamicTarget = (target: any) => R.pipe(getState, R.prop(target))

// === UPDATE
export const assocDynamicTarget = (target: any) => R.assoc(target)
export const assocOpenThread = R.assoc(keys.openThread)
export const assocStatus = R.assoc(keys.status)
export const omitOpenThread = R.omit([keys.openThread])
