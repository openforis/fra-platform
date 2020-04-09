import * as R from 'ramda'

export const stateKey = 'app'
export const stateLoadedKey = 'loaded'

const keys = {
  countryIso: 'countryIso',
  status: 'status',
  i18n: 'i18n',
  printView: 'printView',
}

const keysPrintView = {
  onlyTables: 'onlyTables',
}

const getState = R.prop(stateKey)

// === READ
export const getCountryIso = R.pipe(getState, R.propOr(null, keys.countryIso))
export const getApplicationStatus = R.pipe(getState, R.propOr(null, keys.status))
export const getI18n = R.pipe(getState, R.propOr(null, keys.i18n))

const getPrintView = R.pipe(getState, R.propOr(null, keys.printView))
export const isPrintView = R.pipe(getPrintView, R.isNil, R.not)
export const isPrintOnlyTablesView = R.ifElse(
  isPrintView,
  R.pipe(getPrintView, R.propEq(keysPrintView.onlyTables, true)),
  R.always(false)
)

// === UPDATE

export const assocCountryIso = (countryIso, printView, printOnlyTablesView) =>
  R.pipe(
    R.assoc(keys.countryIso, countryIso),
    R.when(R.always(printView), R.assoc(keys.printView, { [keysPrintView.onlyTables]: printOnlyTablesView }))
  )

export const assocI18n = R.assoc(keys.i18n)

export const setAppStatusLoaded = (i18n) => R.pipe(R.assoc(keys.status, stateLoadedKey), assocI18n(i18n))
