import * as R from 'ramda'

export const stateKey = 'app'
export const stateLoadedKey = 'loaded'

const keys = {
  countryIso: 'countryIso',
  status: 'status',
}

const getState = R.prop(stateKey)

// === READ
export const getCountryIso = R.pipe(getState, R.propOr(null, keys.countryIso))
export const getApplicationStatus = R.pipe(getState, R.propOr(null, keys.status))

// === UPDATE
export const assocCountryIso = R.assoc(keys.countryIso)
export const assocLoadStatus = R.assoc(keys.status)
