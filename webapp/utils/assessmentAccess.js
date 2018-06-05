import * as R from 'ramda'

import { isCollaborator, isReviewer, isAdministrator } from '../../common/countryRole'
import { isCollaboratorAllowedToEditSectionData } from '../../common/assessmentRoleAllowance'

const getAssessment = (state, name) => R.pipe(
  R.path(['country', 'status', 'assessments', name]),
  R.defaultTo({})
)(state)

const getFra2020 = state => getAssessment(state, 'fra2020')

const getFra2020Prop = (state, prop, defaultValue = null) => R.pipe(
  getFra2020,
  R.prop(prop),
  R.defaultTo(defaultValue)
)(state)

export const isAssessmentEditable = (state, name) => R.pipe(
  R.partialRight(getAssessment, [name]),
  R.prop('canEditData'),
  R.defaultTo(false)
)(state)

const isFRA2020Editable = state => getFra2020Prop(state, 'canEditData', false)

const canEditFRA2020Section = (state, section = 'all') => {
  const userInfo = R.path(['user', 'userInfo'], state)

  const canEdit = isFRA2020Editable(state)
  if (canEdit) {
    const countryIso = R.path(['router', 'country'], state)

    // if user is collaborator, he could have restricted access to specific tables
    if (isCollaborator(countryIso, userInfo)) {
      const allowedTables = getFra2020Prop(state, 'tablesAccess')
      return isCollaboratorAllowedToEditSectionData(section, allowedTables)
    }

    //if user is reviewer he must manually unlock the assessment
    if (isReviewer(countryIso, userInfo) && !isAdministrator(userInfo)) {
      const locked = getFra2020Prop(state, 'locked', true)

      return !locked
    }
    return true
  } else {
    return false
  }
}

export const isFRA2020SectionEditDisabled = (state, section) => {
  return !canEditFRA2020Section(state, section)
}
