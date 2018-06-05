import * as R from 'ramda'

import { isCollaborator } from '../../common/countryRole'
import { isCollaboratorAllowedToEditSectionData } from '../../common/assessmentRoleAllowance'

const canEditFRA2020Data = (state, section = 'all') => {
  const assessments = R.path(['country', 'status', 'assessments'], state)
  const userInfo = R.path(['user', 'userInfo'], state)

  const canEdit = R.path(['fra2020', 'canEditData'], assessments)
  if (canEdit) {
    const countryIso = R.path(['router', 'country'], state)

    // if user is collaborator, he could have restricted access to specific tables
    if (isCollaborator(countryIso, userInfo)) {
      const allowedTables = R.path(['fra2020', 'tablesAccess'], assessments)
      return isCollaboratorAllowedToEditSectionData(section, allowedTables)
    }

    return true
  } else {
    return false
  }
}

export const isFRA2020DataEditDisabled = (state, section) => {
  return !canEditFRA2020Data(state, section)
}
