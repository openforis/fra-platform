import { isCollaborator } from '@common/countryRole'
import { isCollaboratorAllowedToEditSectionData } from '@common/assessmentRoleAllowance'
import { isPrintingMode } from '@webapp/pages/AssessmentPrint/printAssessment'

import * as Assessment from '@common/assessment/assessment'

import * as AppState from '@webapp/store/app/state'
import { UserState } from '@webapp/store/user'
import * as CountryState from '@webapp/app/country/countryState'
import * as AssessmentState from '@webapp/app/assessment/assessmentState'

const getAssessment = CountryState.getAssessmentFra2020

// ====== Lock methods

export const isLocked = (state: any) => AssessmentState.isLocked(getAssessment(state))(state)

// ====== Edit allowance methods

const canEditSection = (section = 'all') => (state: any) => {
  const locked = isLocked(state)

  if (locked) {
    return false
  }
  const userInfo = UserState.getUserInfo(state)
  const countryIso = AppState.getCountryIso(state)

  // if user is collaborator, he could have restricted access to specific tables
  if (isCollaborator(countryIso, userInfo)) {
    const assessment = getAssessment(state)
    const allowedTables = Assessment.getTablesAccess(assessment)
    return isCollaboratorAllowedToEditSectionData(section, allowedTables)
  }

  return true
}

export const isSectionEditDisabled = (section: any) => (state: any) =>
  isPrintingMode() || !canEditSection(section)(state)
