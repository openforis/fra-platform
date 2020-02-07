import * as R from 'ramda'

export const stateKey = 'country'

const keys = {
  config: 'config',
  status: 'status',
  countries: 'countries',
}

const getState = R.prop(stateKey)

// === READ
export const getCountries = R.pipe(getState, R.prop(keys.countries))
export const getConfig = R.pipe(getState, R.propOr({}, keys.config))
export const getStatus = R.pipe(getState, R.propOr({}, keys.status))
export const getCanEditData = R.pipe(getState, R.pathOr(null, ['status', 'assessments', 'fra2020', 'canEditData']))

// === UPDATE
export const assocConfig = R.assoc(keys.config)
export const assocCountries = R.assoc(keys.countries)
export const assocStatus = R.assoc(keys.status)

// config functions 
export const getConfigCertifiedAreas = R.pipe(getState, getConfig, R.prop(['certifiedAreas']))
export const getConfigClimaticDomainPercents2015 = R.pipe(getState, getConfig, R.prop(['climaticDomainPercents2015']))
export const getConfigDomain = R.pipe(getState, getConfig, R.prop(['domain']))
export const getConfigFaoStat = R.pipe(getState, getConfig, R.prop(['faoStat']))
export const getConfigFra2015ForestAreas = R.pipe(getState, getConfig, R.prop(['fra2015ForestAreas']))
export const getConfigpanEuropean = R.pipe(getState, getConfig, R.prop(['panEuropean']))
export const getConfigUseOriginalDataPointsInFoc = R.pipe(getState, getConfig, R.prop(['useOriginalDataPointsInFoc']))

// status functions
export const getStatusAssessmentFra2020 = R.pipe(getState, R.pathOr({}, ['status', 'assessments', 'fra2020']))
export const assocStatusAssessmentsNameLocked = (name,locked) => R.assocPath([keys.status,'assessments', name, 'locked'])(locked)
