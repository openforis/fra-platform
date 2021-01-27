// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'

export const stateKey = 'originalDataPoint'

const keys = {
  active: 'active',
  odps: 'odps',
}

const getState = R.prop(stateKey)

// === READ
export const getActive = R.pipe(getState, R.propOr(null, keys.active))
export const getOdps = R.pipe(getState, R.propOr([], keys.odps))

// === UPDATE
export const assocActive = R.assoc(keys.active)
export const assocActiveId = R.assocPath([keys.active, 'odpId'])
export const assocActiveValidation = R.assocPath([keys.active, 'validationStatus'])

export const assocOdps = R.assoc(keys.odps)
