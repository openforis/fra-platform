import * as R from 'ramda'

export const stateKey = 'originalDataPoint'

const keys = {
  active: 'active',
}

const getState = R.prop(stateKey)

// === READ
export const getActiveOriginalDataPoint = R.pipe(getState, R.propOr(null, keys.active))

// === UPDATE
export const assocActiveOriginalDataPoint = R.assoc(keys.active)
