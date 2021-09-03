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

// === UPDATE

export const assocCountryIso = (countryIso: any, assessmentType: any, printView: any, printOnlyTablesView: any) =>
  R.pipe(
    R.assoc(keys.countryIso, countryIso),
    R.assoc(keys.assessmentType, assessmentType),
    R.when(R.always(printView), R.assoc(keys.printView, { [keysPrintView.onlyTables]: printOnlyTablesView }))
  )

export const assocI18n = R.assoc(keys.i18n)
export const assocCountries = R.assoc(keys.countries)
export const assocRegions = R.assoc(keys.regions)
export const assocRegionGroups = R.assoc(keys.regionGroups)

export const setAppStatusLoaded = (i18n: any) => R.pipe(R.assoc(keys.status, stateLoadedKey), assocI18n(i18n))
