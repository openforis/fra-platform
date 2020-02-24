import * as R from 'ramda'

export const stateKey = 'app'
export const stateLoadedKey = 'loaded'

const keys = {
  countryIso: 'countryIso',
  status: 'status',
  i18n: 'i18n',
}

const getState = R.prop(stateKey)

// === READ
export const getCountryIso = R.pipe(getState, R.propOr(null, keys.countryIso))
export const getApplicationStatus = R.pipe(getState, R.propOr(null, keys.status))
export const getI18n = R.pipe(getState, R.propOr(null, keys.i18n))

// === UPDATE
export const assocCountryIso = R.assoc(keys.countryIso)
export const assocI18n = R.assoc(keys.i18n)

export const setAppStatusLoaded = i18n => R.pipe(
  R.assoc(keys.status, stateLoadedKey),
  assocI18n(i18n),
)
