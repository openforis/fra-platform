import * as R from 'ramda'

import * as Country from '@common/country/country'
import * as CountryStatusAssessment from '@common/country/countryStatusAssessment'
import { assessmentStatus } from '@common/assessment'

export const stateKey = 'country'

const keys = {
  config: 'config',
  status: 'status',
  countries: 'countries',
}

const keysStatus = {
  assessments: 'assessments',
  reviewStatus: 'reviewStatus',
}

const getState = R.prop(stateKey)

const _isNotEmpty = R.pipe(R.isEmpty, R.not)
// === READ
export const getCountries = R.pipe(getState, R.propOr({}, keys.countries))
export const hasCountries = R.pipe(getCountries, _isNotEmpty)
export const getCountriesList = R.pipe(getCountries, R.values, R.flatten)
export const getCountryByCountryIso = countryIso => R.pipe(getCountriesList, R.find(R.propEq(Country.keys.countryIso, countryIso)))
export const getConfig = R.pipe(getState, R.propOr({}, keys.config))
export const getStatus = R.pipe(getState, R.propOr({}, keys.status))
export const hasStatus = R.pipe(getStatus, _isNotEmpty)
export const getAssessments = R.pipe(getStatus, R.propOr({}, keysStatus.assessments))
export const getReviewStatus = R.pipe(getStatus, R.propOr({}, keysStatus.reviewStatus))

// === UPDATE
export const assocConfig = R.assoc(keys.config)
export const assocCountries = R.assoc(keys.countries)
export const assocStatus = R.assoc(keys.status)

export const assocStatusAssessmentLocked = (name, locked) => R.assocPath([keys.status, keysStatus.assessments, name, CountryStatusAssessment.keys.locked], locked)
export const assocStatusAssessmentChanging = name => R.assocPath([keys.status, keysStatus.assessments, name, CountryStatusAssessment.keys.status], assessmentStatus.changing)

// config functions
const _getConfigProp = prop => R.pipe(getConfig, R.prop(prop))
export const getConfigCertifiedAreas = _getConfigProp('certifiedAreas')
export const getConfigClimaticDomainPercents2015 = _getConfigProp('climaticDomainPercents2015')
export const getConfigDomain = _getConfigProp('domain')
export const getConfigFaoStat = _getConfigProp('faoStat')
export const getConfigFra2015ForestAreas = _getConfigProp('fra2015ForestAreas')
export const getConfigpanEuropean = _getConfigProp('panEuropean')
export const getConfigUseOriginalDataPointsInFoc = _getConfigProp('useOriginalDataPointsInFoc')

//TODO Move to assessmentState
// status functions
export const getStatusAssessmentFra2020 = R.pipe(getAssessments, R.propOr({}, 'fra2020'))
export const getCanEditData = R.pipe(getStatusAssessmentFra2020, R.propOr(null, 'canEditData'))
