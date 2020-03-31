import * as R from 'ramda'

export const stateKey = 'app'
export const stateLoadedKey = 'loaded'

const keys = {
  countryIso: 'countryIso',
  status: 'status',
  i18n: 'i18n',
  printView: 'printView',
  printOnlyTablesView: 'printOnlyTablesView',
}

const getState = R.prop(stateKey)

// === READ
export const getCountryIso = R.pipe(getState, R.propOr(null, keys.countryIso))
export const getApplicationStatus = R.pipe(getState, R.propOr(null, keys.status))
export const getI18n = R.pipe(getState, R.propOr(null, keys.i18n))
export const isPrintView = R.pipe(getState, R.propEq(keys.printView, true))
export const isPrintOnlyTablesView = R.pipe(getState, R.propEq(keys.printOnlyTablesView, true))

// === UPDATE
export const assocCountryIso = (countryIso, printView, printOnlyTablesView) =>
  R.pipe(
    R.assoc(keys.countryIso, countryIso),
    R.assoc(keys.printView, printView),
    R.assoc(keys.printOnlyTablesView, printOnlyTablesView)
  )

export const assocI18n = R.assoc(keys.i18n)

export const setAppStatusLoaded = (i18n) => R.pipe(R.assoc(keys.status, stateLoadedKey), assocI18n(i18n))
