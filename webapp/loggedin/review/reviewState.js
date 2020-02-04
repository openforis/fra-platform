import * as R from 'ramda'

export const stateKey = 'review'

const keys = {
  openThread: 'openThread',
}

const getState = R.prop(stateKey)

// === READ
export const getOpenThread = R.pipe(getState, R.propOr({ target: [], section: '' }, keys.openThread))

// === UPDATE
export const assocOpenThread = R.assoc(keys.openThread)
