import * as R from 'ramda'

import * as Assessment from '@common/assessment/assessment'
import FRA from '@common/assessment/fra'
import FRAUtils from '@common/fraUtils'

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
export const getAssessment = (name: any) => R.pipe(CountryState.getAssessments, R.propOr({}, name))

const getState = R.propOr({}, stateKey)

const getStateAssessment = (type: any) => R.pipe(getState, R.propOr({}, type))

const _isLocked = (type: any) => R.pipe(getStateAssessment(type), R.propOr(true, keys.lock))

// ======  Lock functions

export const isLocked = (assessment: any) => (state: any) => {
  const countryIso = AppState.getCountryIso(state)
  const userInfo = UserState.getUserInfo(state)

  if (isReviewer(countryIso, userInfo) || isAdministrator(userInfo)) {
    const type = Assessment.getType(assessment)
    return _isLocked(type)(state)
  }

  return !Assessment.getCanEditData(assessment)
}

export const canToggleLock = (assessment: any) => (state: any) => {
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

export const assocLock = (assessmentType: any, lock: any) => R.assocPath([assessmentType, keys.lock], lock)

// ====== Section

const _getSectionPath = (assessmentType: any, sectionName: any) => [assessmentType, keys.sections, sectionName]

// ====== Section - Prop

const _getSectionPropPath = (assessmentType: any, sectionName: any, propName: any) => [
  ..._getSectionPath(assessmentType, sectionName),
  propName,
]

export const assocSectionProp = (assessmentType: any, sectionName: any, propName: any, value: any) =>
  R.assocPath(_getSectionPropPath(assessmentType, sectionName, propName), value)

export const getSectionProp = (assessmentType: any, sectionName: any, propName: any, defaultValue: any = null) =>
  R.pipe(getState, R.pathOr(defaultValue, _getSectionPropPath(assessmentType, sectionName, propName)))

// ====== Section - Data Table

const _getTableDataPath = (assessmentType: any, sectionName: any, tableName: any) => [
  ..._getSectionPropPath(assessmentType, sectionName, keysSection.data),
  tableName,
]

const _getTableGeneratingPath = (assessmentType: any, sectionName: any, tableName: any) => [
  ..._getSectionPropPath(assessmentType, sectionName, keysSection.generatingValues),
  tableName,
]

export const assocSectionData = (assessmentType: any, sectionName: any, tableName: any, data: any) =>
  R.assocPath(_getTableDataPath(assessmentType, sectionName, tableName), data)

export const getSectionData = (assessmentType: any, sectionName: any, tableName: any) =>
  R.pipe(getState, R.pathOr(null, _getTableDataPath(assessmentType, sectionName, tableName)))

export const isSectionDataLoaded = (assessmentType: any, sectionName: any, tableName: any) =>
  R.pipe(getSectionData(assessmentType, sectionName, tableName), R.isNil, R.not)

export const isSectionDataEmpty = (assessmentType: any, sectionName: any, tableName: any) =>
  R.pipe(getSectionData(assessmentType, sectionName, tableName), FRAUtils.isTableEmpty)

export const getFra = (assessmentType: any, sectionName: any, tableName: any) =>
  R.pipe(getSectionData(assessmentType, sectionName, tableName), R.propOr(null, keysDataTableWithOdp.fra))

export const getFraNoNDPs = (assessmentType: any, sectionName: any, tableName: any) =>
  R.pipe(getSectionData(assessmentType, sectionName, tableName), R.propOr(null, keysDataTableWithOdp.fraNoNDPs))

// ==== Table Data Cell getters

export const getTableDataCell = ({ assessmentType, sectionName, tableName, colIdx, rowIdx }: any) =>
  R.pipe(getSectionData(assessmentType, sectionName, tableName), R.pathOr(null, [rowIdx, colIdx]))

export const getTableDataCellByFRAYear = ({ assessmentType, sectionName, tableName, year, rowIdx }: any) =>
  getTableDataCell({ assessmentType, sectionName, tableName, colIdx: FRA.years.indexOf(year), rowIdx })

// ====== Section - Generating Values

export const assocSectionDataGeneratingValues = (
  assessmentType: any,
  sectionName: any,
  tableName: any,
  generating: any
) => R.assocPath(_getTableGeneratingPath(assessmentType, sectionName, tableName), generating)

export const getSectionDataGeneratingValues = (assessmentType: any, sectionName: any, tableName: any) =>
  R.pipe(getState, R.pathOr(false, _getTableGeneratingPath(assessmentType, sectionName, tableName)))
