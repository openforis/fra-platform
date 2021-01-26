import * as R from 'ramda'

export const stateKey = 'app'
export const stateLoadedKey = 'loaded'

const keys = {
  countryIso: 'countryIso',
  assessmentType: 'assessmentType',
  status: 'status',
  i18n: 'i18n',
  regions: 'regions',
  regionGroups: 'regionGroups',
  countries: 'countries',
  printView: 'printView',
}

const keysPrintView = {
  onlyTables: 'onlyTables',
}

const getState = R.prop(stateKey)

// === READ
export const getCountryIso = R.pipe(getState, R.propOr(null, keys.countryIso))
export const getAssessmentType = R.pipe(getState, R.propOr(null, keys.assessmentType))
export const getApplicationStatus = R.pipe(getState, R.propOr(null, keys.status))
export const getI18n = R.pipe(getState, R.propOr(null, keys.i18n))
export const getCountries = R.pipe(getState, R.propOr([], keys.countries))
export const getRegions = R.pipe(getState, R.propOr([], keys.regions))
export const getRegionGroups = R.pipe(getState, R.propOr([], keys.regionGroups))

const getPrintView = R.pipe(getState, R.propOr(null, keys.printView))
export const isPrintView = R.pipe(getPrintView, R.isNil, R.not)
export const isPrintOnlyTablesView = R.ifElse(
  isPrintView,
  R.pipe(getPrintView, R.propEq(keysPrintView.onlyTables, true)),
  R.always(false)
)

// === UPDATE

export const assocCountryIso = (countryIso, assessmentType, printView, printOnlyTablesView) =>
  R.pipe(
    R.assoc(keys.countryIso, countryIso),
    R.assoc(keys.assessmentType, assessmentType),
    R.when(R.always(printView), R.assoc(keys.printView, { [keysPrintView.onlyTables]: printOnlyTablesView }))
  )

export const assocI18n = R.assoc(keys.i18n)
export const assocCountries = R.assoc(keys.countries)
export const assocRegions = R.assoc(keys.regions)
export const assocRegionGroups = R.assoc(keys.regionGroups)

export const setAppStatusLoaded = (i18n) => R.pipe(R.assoc(keys.status, stateLoadedKey), assocI18n(i18n))
