import * as R from 'ramda'
import * as Country from '@common/country/country'

export const stateKey = 'country'

const keys = {
  config: 'config',
  status: 'status',
  countries: 'countries',
}

const getState = R.prop(stateKey)

// === READ
export const getCountries = R.pipe(getState, R.prop(keys.countries))
export const getCountriesList = R.pipe(getCountries, R.values, R.flatten)
export const getCountryByCountryIso = countryIso => R.pipe(getCountriesList, R.find(R.propEq(Country.keys.countryIso, countryIso)))
export const getConfig = R.pipe(getState, R.propOr({}, keys.config))
export const getStatus = R.pipe(getState, R.propOr({}, keys.status))
export const getCanEditData = R.pipe(getState, R.pathOr(null, ['status', 'assessments', 'fra2020', 'canEditData']))

// === UPDATE
export const assocConfig = R.assoc(keys.config)
export const assocCountries = R.assoc(keys.countries)
export const assocStatus = R.assoc(keys.status)

// config functions
const _getConfigProp = prop => R.pipe(getConfig, R.prop(prop))
export const getConfigCertifiedAreas = _getConfigProp('certifiedAreas')
export const getConfigClimaticDomainPercents2015 = _getConfigProp('climaticDomainPercents2015')
export const getConfigDomain = _getConfigProp('domain')
export const getConfigFaoStat = _getConfigProp('faoStat')
export const getConfigFra2015ForestAreas = _getConfigProp('fra2015ForestAreas')
export const getConfigpanEuropean = _getConfigProp('panEuropean')
export const getConfigUseOriginalDataPointsInFoc = _getConfigProp('useOriginalDataPointsInFoc')

// status functions
export const getStatusAssessmentFra2020 = R.pipe(getStatus, R.pathOr({}, ['assessments', 'fra2020']))
export const assocStatusAssessmentsNameLocked = (name, locked) => R.assocPath([keys.status, 'assessments', name, 'locked'])(locked)
