// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'status'.
const { assessmentStatus: status } = require('./assessment')
const {
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'noRole'.
  noRole,
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'collaborat... Remove this comment to see the full error message
  collaborator,
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'alternateN... Remove this comment to see the full error message
  alternateNationalCorrespondent,
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'nationalCo... Remove this comment to see the full error message
  nationalCorrespondent,
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'reviewer'.
  reviewer,
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'administra... Remove this comment to see the full error message
  administrator,
} = require('./countryRole')
/**
 * @deprecated
 */
// @ts-expect-error ts-migrate(7005) FIXME: Variable 'roleAllowances' implicitly has an '{ [x:... Remove this comment to see the full error message
const roleAllowances = {
  [noRole.role]: {
    comments: [],
    data: [],
  },
  [collaborator.role]: {
    comments: [(status as any).editing],
    data: [(status as any).editing],
  },
  [alternateNationalCorrespondent.role]: {
    comments: [(status as any).editing],
    data: [(status as any).editing],
  },
  [nationalCorrespondent.role]: {
    comments: [(status as any).editing],
    data: [(status as any).editing],
  },
  [reviewer.role]: {
    comments: [(status as any).editing, (status as any).review],
    data: [(status as any).editing, (status as any).review],
  },
  [administrator.role]: {
    comments: [(status as any).editing, (status as any).review, (status as any).approval, (status as any).accepted],
    data: [(status as any).editing, (status as any).review, (status as any).approval, (status as any).accepted],
  },
}
/**
 * @deprecated
 */
const isUserRoleAllowedToEdit = (role: any, assessmentStatus: any, editType: any) => {
  if (R.isNil(role) || R.isNil(role.role)) return false
  const allowedStatusesForRole = R.path([role.role, editType], roleAllowances)
  return R.includes(assessmentStatus, allowedStatusesForRole)
}
/**
 * @deprecated
 */
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'isUserRole... Remove this comment to see the full error message
const isUserRoleAllowedToEditAssessmentComments = (role: any, assessmentStatus: any) =>
  isUserRoleAllowedToEdit(role, assessmentStatus, 'comments')
/**
 * @deprecated
 */
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'isUserRole... Remove this comment to see the full error message
const isUserRoleAllowedToEditAssessmentData = (role: any, assessmentStatus: any) =>
  isUserRoleAllowedToEdit(role, assessmentStatus, 'data')
/**
 * @deprecated
 */
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'isCollabor... Remove this comment to see the full error message
const isCollaboratorAllowedToEditSectionData = (section: any, allowedTables: any) => {
  const allowedSections = allowedTables.map((t: any) => t.section)
  if (R.includes('all', allowedSections) || R.includes(section, allowedSections)) return true
  return false
}
module.exports = {
  roleAllowances,
  /**
   * @deprecated
   */
  isUserRoleAllowedToEdit,
  /**
   * @deprecated
   */
  isUserRoleAllowedToEditAssessmentComments,
  /**
   * @deprecated
   */
  isUserRoleAllowedToEditAssessmentData,
  /**
   * @deprecated
   */
  isCollaboratorAllowedToEditSectionData,
}
