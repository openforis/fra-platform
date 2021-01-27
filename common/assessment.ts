const {
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'isAdminist... Remove this comment to see the full error message
  isAdministrator,
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'isNational... Remove this comment to see the full error message
  isNationalCorrespondent,
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'isAlternat... Remove this comment to see the full error message
  isAlternateNationalCorrespondent,
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'isReviewer... Remove this comment to see the full error message
  isReviewer,
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'isCollabor... Remove this comment to see the full error message
  isCollaborator,
} = require('./countryRole')

/**
 * @deprecated
 */
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'assessment... Remove this comment to see the full error message
const assessmentStatus = {
  editing: 'editing',
  review: 'review',
  approval: 'approval',
  accepted: 'accepted',
  changing: 'changing',
}

/**
 * @deprecated
 */
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getAllowed... Remove this comment to see the full error message
const getAllowedStatusTransitions = (countryIso: any, userInfo: any, currentState: any) => {
  // collaborator cannot change the status of the assessment
  if (!userInfo || isCollaborator(countryIso, userInfo)) return {}

  switch (currentState) {
    // in review, only reviewer can do transitions
    case assessmentStatus.review:
      return isAdministrator(userInfo) || isReviewer(countryIso, userInfo)
        ? { previous: assessmentStatus.editing, next: assessmentStatus.approval }
        : {}

    // In approval or accepted, only admin can do transitions
    case assessmentStatus.approval:
      return isAdministrator(userInfo) ? { previous: assessmentStatus.review, next: assessmentStatus.accepted } : {}

    case assessmentStatus.accepted:
      return isAdministrator(userInfo) ? { previous: assessmentStatus.review } : {}

    // System's in the middle of changing the state
    case assessmentStatus.changing:
      return {}

    // in editing or default only nationalCorrespondent can submit to review
    case assessmentStatus.editing:
    default:
      return isAdministrator(userInfo) ||
        isNationalCorrespondent(countryIso, userInfo) ||
        isAlternateNationalCorrespondent(countryIso, userInfo)
        ? { next: assessmentStatus.review }
        : {}
  }
}

module.exports = {
  /**
   * @deprecated
   */
  assessmentStatus,

  /**
   * @deprecated
   */
  getAllowedStatusTransitions,
}
