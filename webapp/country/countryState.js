import * as R from 'ramda'

export const stateKey = 'country'

const keys = {
  config: 'config',
  status: 'status',
  countries: 'countries',
}

const getState = R.prop(stateKey)

// === READ
export const getConfig = R.pipe(getState, R.propOr({}, keys.config))
export const getStatus = R.pipe(getState, R.propOr({}, keys.status))
export const getCanEditData = R.pipe(getState, R.pathOr(null, ['status', 'assessments', 'fra2020', 'canEditData']))

// === UPDATE
export const assocConfig = R.assoc(keys.config)
