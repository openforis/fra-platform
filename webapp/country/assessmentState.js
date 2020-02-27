/**
 * This is a sub state of CountryState
 */

import * as R from 'ramda'

import * as CountryStatusAssessment from '@common/country/countryStatusAssessment'
import { isReviewer, isAdministrator } from '@common/countryRole'
import { assessmentStatus } from '@common/assessment'

import * as AppState from '@webapp/app/appState'
import * as CountryState from '@webapp/country/countryState'
import * as UserState from '@webapp/user/userState'

export const getAssessment = name => R.pipe(CountryState.getAssessments, R.propOr({}, name))

// ==== Lock functions
export const isLocked = assessment => state => {
  const countryIso = AppState.getCountryIso(state)
  const userInfo = UserState.getUserInfo(state)

  if (isReviewer(countryIso, userInfo) || isAdministrator(userInfo)) {
    return CountryStatusAssessment.getLocked(assessment)
  } else {
    return !CountryStatusAssessment.getCanEditData(assessment)
  }
}

export const canToggleLock = assessment => state => {
  const countryIso = AppState.getCountryIso(state)
  const userInfo = UserState.getUserInfo(state)

  if (isAdministrator(userInfo)) {
    return true
  }
  if (isReviewer(countryIso, userInfo)) {
    const status = CountryStatusAssessment.getStatus(assessment)
    return R.includes(status, [assessmentStatus.editing, assessmentStatus.review])
  }

  return false
}
