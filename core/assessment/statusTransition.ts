import { User, Users } from '@core/auth'
import { Assessment, AssessmentStatus } from './assessment'

export interface AssessmentStatusTransition {
  next?: AssessmentStatus
  previous?: AssessmentStatus
}

export const AssessmentStatusTransitions = {
  getAllowedTransition: (props: {
    assessment: Assessment
    countryIso: string
    userInfo: User
  }): AssessmentStatusTransition => {
    const { assessment, countryIso, userInfo } = props

    // collaborator cannot change the status of the assessment
    if (!userInfo || Users.isCollaborator(userInfo, countryIso)) return {}

    switch (assessment.status) {
      // in review, only reviewer can do transitions
      case AssessmentStatus.review:
        return Users.isAdministrator(userInfo) || Users.isReviewer(userInfo, countryIso)
          ? { previous: AssessmentStatus.editing, next: AssessmentStatus.approval }
          : {}

      // In approval or accepted, only admin can do transitions
      case AssessmentStatus.approval:
        return Users.isAdministrator(userInfo)
          ? { previous: AssessmentStatus.review, next: AssessmentStatus.accepted }
          : {}

      case AssessmentStatus.accepted:
        return Users.isAdministrator(userInfo) ? { previous: AssessmentStatus.review } : {}

      // System's in the middle of changing the state
      case AssessmentStatus.changing:
        return {}

      // in editing or default NationalCorrespondent and AlternateNationalCorrespondent can submit to review
      case AssessmentStatus.editing:
      default:
        return Users.isAdministrator(userInfo) ||
          Users.isNationalCorrespondent(userInfo, countryIso) ||
          Users.isAlternateNationalCorrespondent(userInfo, countryIso)
          ? { next: AssessmentStatus.review }
          : {}
    }
  },
}
