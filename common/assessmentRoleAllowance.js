const R = require('ramda')
const {assessmentStatus: status} = require('./assessment')

const {
  noRole,
  collaborator,
  alternateNationalCorrespondent,
  nationalCorrespondent,
  reviewer,
  administrator
} = require('./countryRole')

const roleAllowances = {
  [noRole.role]: {
    comments: [],
    data: []
  },

  [collaborator.role]: {
    comments: [status.editing],
    data: [status.editing]
  },

  [alternateNationalCorrespondent.role]: {
    comments: [status.editing],
    data: [status.editing]
  },

  [nationalCorrespondent.role]: {
    comments: [status.editing],
    data: [status.editing]
  },

  [reviewer.role]: {
    comments: [status.editing, status.review],
    data: [status.editing, status.review]
  },

  [administrator.role]: {
    comments: [status.editing, status.review, status.approval, status.accepted],
    data: [status.editing, status.review, status.approval, status.accepted]
  }
}

const isUserRoleAllowedToEdit = (role, assessmentStatus, editType) => {
  if (R.isNil(role) || R.isNil(role.role)) return false
  const allowedStatusesForRole = R.path([role.role, editType], roleAllowances)
  return R.includes(assessmentStatus, allowedStatusesForRole)
}

const isUserRoleAllowedToEditAssessmentComments = (role, assessmentStatus) =>
  isUserRoleAllowedToEdit(role, assessmentStatus, 'comments')

const isUserRoleAllowedToEditAssessmentData = (role, assessmentStatus) =>
  isUserRoleAllowedToEdit(role, assessmentStatus, 'data')

const isCollaboratorAllowedToEditSectionData = (section, allowedTables) => {
  const allowedSections = allowedTables.map(t => t.section)

  if (R.includes('all', allowedSections) || R.includes(section, allowedSections))
    return true
  return false
}

module.exports = {
  isUserRoleAllowedToEdit,
  isUserRoleAllowedToEditAssessmentComments,
  isUserRoleAllowedToEditAssessmentData,
  isCollaboratorAllowedToEditSectionData
}
