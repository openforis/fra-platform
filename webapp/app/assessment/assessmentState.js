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
}

// TODO: Now assessment is part of country status - refactor it
export const getAssessment = name => R.pipe(CountryState.getAssessments, R.propOr({}, name))

const getState = R.propOr({}, stateKey)

const getStateAssessment = type => R.pipe(getState, R.propOr({}, type))

const _isLocked = type => R.pipe(getStateAssessment(type), R.propOr(true, keys.lock))

// ==== Lock functions

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

export const assocLock = (type, lock) => R.assocPath([type, keys.lock], lock)
