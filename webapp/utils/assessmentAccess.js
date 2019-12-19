import * as R from 'ramda'

import * as AppState from '../app/appState'

import { isCollaborator, isReviewer, isAdministrator } from '../../common/countryRole'
import { isCollaboratorAllowedToEditSectionData } from '../../common/assessmentRoleAllowance'
import { assessmentStatus } from '../../common/assessment'
import { isPrintingMode } from '../printAssessment/printAssessment'

const getUserInfo = R.path(['user', 'userInfo'])
const getCountryIso = AppState.getCountryIso

const getAssessment = name => R.pipe(
  R.path(['country', 'status', 'assessments', name]),
  R.defaultTo({})
)

const getAssessmentProp = (assessmentName, prop, defaultValue = null) => R.pipe(
  getAssessment(assessmentName),
  R.prop(prop),
  R.defaultTo(defaultValue)
)

export const isAssessmentLocked = (state, assessmentName) => {
  const canEdit = getAssessmentProp(assessmentName, 'canEditData', false)(state)

  const userInfo = getUserInfo(state)
  const countryIso = getCountryIso(state)

  if (isReviewer(countryIso, userInfo) || isAdministrator(userInfo)) {
    const locked = getAssessmentProp(assessmentName, 'locked', true)(state)
    return locked
  }

  return !canEdit
}

export const canToggleAssessmentLock = (state, assessmentName) => {
  const userInfo = getUserInfo(state)
  const countryIso = getCountryIso(state)

  if (isAdministrator(userInfo)) {
    return true
  }
  if (isReviewer(countryIso, userInfo)) {
    const status = getAssessmentProp(assessmentName, 'status', '')(state)
    return R.contains(status, [assessmentStatus.editing, assessmentStatus.review])
  }

  return false
}

const fra2020 = 'fra2020'

const canEditFRA2020Section = (state, section = 'all') => {
  const isLocked = isAssessmentLocked(state, fra2020)

  if (isLocked) {

    return false

  } else {

    const userInfo = getUserInfo(state)
    const countryIso = getCountryIso(state)

    // if user is collaborator, he could have restricted access to specific tables
    if (isCollaborator(countryIso, userInfo)) {
      const allowedTables = getAssessmentProp(fra2020, 'tablesAccess')(state)
      return isCollaboratorAllowedToEditSectionData(section, allowedTables)
    }
    return true

  }

}

export const isFRA2020SectionEditDisabled = (state, section) => {
  return isPrintingMode() || !canEditFRA2020Section(state, section)
}
