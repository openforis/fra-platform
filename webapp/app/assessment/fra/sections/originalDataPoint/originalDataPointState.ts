import * as R from 'ramda'

export const stateKey = 'originalDataPoint'

const keys = {
  active: 'active',
  odps: 'odps',
}

const getState = R.prop(stateKey)

// === READ
export const getActive = (x?: any) => R.pipe(getState, R.propOr(null, keys.active))(x)
// @ts-ignore
export const getOdps = (x?: any): any[] => R.pipe(getState, R.propOr([], keys.odps))(x)

// === UPDATE
export const assocActive = R.assoc(keys.active)
export const assocActiveId = R.assocPath([keys.active, 'odpId'])
export const assocActiveValidation = R.assocPath([keys.active, 'validationStatus'])

export const assocOdps = R.assoc(keys.odps)
