import * as R from 'ramda'

import * as Assessment from '@common/assessment/assessment'
import * as FRA from '@common/assessment/fra'
import * as FRAUtils from '@common/fraUtils'

import { isReviewer, isAdministrator } from '@common/countryRole'
import { assessmentStatus } from '@common/assessment'

import * as AppState from '@webapp/store/app/state'
import * as CountryState from '@webapp/app/country/countryState'
import { UserState } from '@webapp/store/user'

export const stateKey = 'assessment'

const keys = {
  lock: 'lock',
  sections: 'sections',
}

const keysSection = {
  data: 'data',
  generatingValues: 'generatingValues',
}

export const keysDataTableWithOdp = {
  fra: 'fra',
  fraNoNDPs: 'fraNoNDPs',
}

// TODO: Now assessment is part of country status - refactor it
export const getAssessment = (name) => R.pipe(CountryState.getAssessments, R.propOr({}, name))

const getState = R.propOr({}, stateKey)

const getStateAssessment = (type) => R.pipe(getState, R.propOr({}, type))

const _isLocked = (type) => R.pipe(getStateAssessment(type), R.propOr(true, keys.lock))

// ======  Lock functions

export const isLocked = (assessment) => (state) => {
  const countryIso = AppState.getCountryIso(state)
  const userInfo = UserState.getUserInfo(state)

  if (isReviewer(countryIso, userInfo) || isAdministrator(userInfo)) {
    const type = Assessment.getType(assessment)
    return _isLocked(type)(state)
  }

  return !Assessment.getCanEditData(assessment)
}

export const canToggleLock = (assessment) => (state) => {
  const countryIso = AppState.getCountryIso(state)
  const userInfo = UserState.getUserInfo(state)

  if (isAdministrator(userInfo)) {
    return true
  }
  if (isReviewer(countryIso, userInfo)) {
    const status = Assessment.getStatus(assessment)
    return R.includes(status, [assessmentStatus.editing, assessmentStatus.review])
  }

  return false
}

export const assocLock = (assessmentType, lock) => R.assocPath([assessmentType, keys.lock], lock)

// ====== Section

const _getSectionPath = (assessmentType, sectionName) => [assessmentType, keys.sections, sectionName]

// ====== Section - Prop

const _getSectionPropPath = (assessmentType, sectionName, propName) => [
  ..._getSectionPath(assessmentType, sectionName),
  propName,
]

export const assocSectionProp = (assessmentType, sectionName, propName, value) =>
  R.assocPath(_getSectionPropPath(assessmentType, sectionName, propName), value)

export const getSectionProp = (assessmentType, sectionName, propName, defaultValue = null) =>
  R.pipe(getState, R.pathOr(defaultValue, _getSectionPropPath(assessmentType, sectionName, propName)))

// ====== Section - Data Table

const _getTableDataPath = (assessmentType, sectionName, tableName) => [
  ..._getSectionPropPath(assessmentType, sectionName, keysSection.data),
  tableName,
]

const _getTableGeneratingPath = (assessmentType, sectionName, tableName) => [
  ..._getSectionPropPath(assessmentType, sectionName, keysSection.generatingValues),
  tableName,
]

export const assocSectionData = (assessmentType, sectionName, tableName, data) =>
  R.assocPath(_getTableDataPath(assessmentType, sectionName, tableName), data)

export const getSectionData = (assessmentType, sectionName, tableName) =>
  R.pipe(getState, R.pathOr(null, _getTableDataPath(assessmentType, sectionName, tableName)))

export const isSectionDataLoaded = (assessmentType, sectionName, tableName) =>
  R.pipe(getSectionData(assessmentType, sectionName, tableName), R.isNil, R.not)

export const isSectionDataEmpty = (assessmentType, sectionName, tableName) =>
  R.pipe(getSectionData(assessmentType, sectionName, tableName), FRAUtils.isTableEmpty)

export const getFra = (assessmentType, sectionName, tableName) =>
  R.pipe(getSectionData(assessmentType, sectionName, tableName), R.propOr(null, keysDataTableWithOdp.fra))

export const getFraNoNDPs = (assessmentType, sectionName, tableName) =>
  R.pipe(getSectionData(assessmentType, sectionName, tableName), R.propOr(null, keysDataTableWithOdp.fraNoNDPs))

// ==== Table Data Cell getters

export const getTableDataCell = ({ assessmentType, sectionName, tableName, colIdx, rowIdx }) =>
  R.pipe(getSectionData(assessmentType, sectionName, tableName), R.pathOr(null, [rowIdx, colIdx]))

export const getTableDataCellByFRAYear = ({ assessmentType, sectionName, tableName, year, rowIdx }) =>
  getTableDataCell({ assessmentType, sectionName, tableName, colIdx: FRA.years.indexOf(year), rowIdx })

// ====== Section - Generating Values

export const assocSectionDataGeneratingValues = (assessmentType, sectionName, tableName, generating) =>
  R.assocPath(_getTableGeneratingPath(assessmentType, sectionName, tableName), generating)

export const getSectionDataGeneratingValues = (assessmentType, sectionName, tableName) =>
  R.pipe(getState, R.pathOr(false, _getTableGeneratingPath(assessmentType, sectionName, tableName)))
