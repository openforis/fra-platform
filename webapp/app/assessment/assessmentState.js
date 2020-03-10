import * as R from 'ramda'

import * as Assessment from '@common/assessment/assessment'

import { isReviewer, isAdministrator } from '@common/countryRole'
import { assessmentStatus } from '@common/assessment'

import * as AppState from '@webapp/app/appState'
import * as CountryState from '@webapp/app/country/countryState'
import * as UserState from '@webapp/user/userState'

export const stateKey = 'assessment'

const keys = {
  lock: 'lock',
  sections: 'sections',
}

const keysSection = {
  data: 'data',
}

// TODO: Now assessment is part of country status - refactor it
export const getAssessment = name => R.pipe(CountryState.getAssessments, R.propOr({}, name))

const getState = R.propOr({}, stateKey)

const getStateAssessment = type => R.pipe(getState, R.propOr({}, type))

const _isLocked = type => R.pipe(getStateAssessment(type), R.propOr(true, keys.lock))

// ======  Lock functions

export const isLocked = assessment => state => {
  const countryIso = AppState.getCountryIso(state)
  const userInfo = UserState.getUserInfo(state)

  if (isReviewer(countryIso, userInfo) || isAdministrator(userInfo)) {
    const type = Assessment.getType(assessment)
    return _isLocked(type)(state)
  } else {
    return !Assessment.getCanEditData(assessment)
  }
}

export const canToggleLock = assessment => state => {
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

// ====== Section data

const _getSectionDataPath = (assessmentType, sectionName, tableName) =>
  [assessmentType, keys.sections, sectionName, keysSection.data, tableName]

export const assocSectionData = (assessmentType, sectionName, tableName, data) =>
  R.assocPath(_getSectionDataPath(assessmentType, sectionName, tableName), data)

export const getSectionData = (assessmentType, sectionName, tableName) => R.pipe(
  getState,
  R.pathOr(null, _getSectionDataPath(assessmentType, sectionName, tableName)),
)

export const isSectionDataEmpty = (assessmentType, sectionName, tableName) => R.pipe(
  getSectionData(assessmentType, sectionName, tableName),
  R.defaultTo([]),
  R.flatten,
  R.reject(R.isNil),
  R.isEmpty,
)
