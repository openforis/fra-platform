import * as R from 'ramda'

export const stateKey = 'app'

const keys = {
  countryIso: 'countryIso'
}

const getState = R.prop(stateKey)

// === READ
export const getCountryIso = R.pipe(getState, R.propOr(null, keys.countryIso))

// === UPDATE
export const assocCountryIso = R.assoc(keys.countryIso)

