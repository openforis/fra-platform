import * as R from 'ramda'

import * as Country from '@common/country/country'
import * as Assessment from '@common/assessment/assessment'
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
export const getCountryByCountryIso = countryIso =>
  R.pipe(getCountriesList, R.find(R.propEq(Country.keys.countryIso, countryIso)))
export const getConfig = R.pipe(getState, R.propOr({}, keys.config))
export const getStatus = R.pipe(getState, R.propOr({}, keys.status))
export const hasStatus = R.pipe(getStatus, _isNotEmpty)
export const getAssessments = R.pipe(getStatus, R.propOr({}, keysStatus.assessments))
export const getReviewStatus = R.pipe(getStatus, R.propOr({}, keysStatus.reviewStatus))

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

export const getConfigCertifiedAreaByYear = year => R.pipe(getConfigCertifiedAreas, R.propOr(null, String(year)))

// ====== TODO Move to assessmentState
export const assocStatusAssessmentChanging = name =>
  R.assocPath([keys.status, keysStatus.assessments, name, Assessment.keys.status], assessmentStatus.changing)

// status functions
export const getAssessmentFra2020 = R.pipe(getAssessments, R.propOr({}, 'fra2020'))
export const getCanEditData = R.pipe(getAssessmentFra2020, R.propOr(null, 'canEditData'))
