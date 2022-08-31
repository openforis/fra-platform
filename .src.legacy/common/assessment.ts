import {
  isAdministrator,
  isNationalCorrespondent,
  isAlternateNationalCorrespondent,
  isReviewer,
  isCollaborator,
} from './countryRole'

/**
 * @deprecated.
 * Use AssessmentStatus
 */
export const assessmentStatus = {
  editing: 'editing',
  review: 'review',
  approval: 'approval',
  accepted: 'accepted',
  changing: 'changing',
}

/**
 * @deprecated.
 * Use AssessmentStatusTransitions.getAllowedTransitions
 */
export const getAllowedStatusTransitions = (countryIso: any, userInfo: any, currentState: any) => {
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

/**
 * @deprecated
 */
export default {
  /**
   * @deprecated
   */
  assessmentStatus,

  /**
   * @deprecated
   */
  getAllowedStatusTransitions,
}
