import { CountryIso } from '@meta/area'
import { User, Users } from '../user'
import { AssessmentStatus, CountryStatus } from './index'

export interface AssessmentStatusTransition {
  next?: AssessmentStatus
  previous?: AssessmentStatus
}

export const CountryStatusTransitions = {
  getAllowedTransition: (props: {
    countryStatus: CountryStatus
    countryIso: CountryIso
    user: User
  }): AssessmentStatusTransition => {
    const { countryStatus, countryIso, user } = props

    // collaborator cannot change the status of the assessment
    if (!user || Users.isCollaborator(user, countryIso)) return {}

    switch (countryStatus.status) {
      // in review, only reviewer can do transitions
      case AssessmentStatus.review:
        return Users.isAdministrator(user) || Users.isReviewer(user, countryIso)
          ? { previous: AssessmentStatus.editing, next: AssessmentStatus.approval }
          : {}

      // In approval or accepted, only admin can do transitions
      case AssessmentStatus.approval:
        return Users.isAdministrator(user) ? { previous: AssessmentStatus.review, next: AssessmentStatus.accepted } : {}

      case AssessmentStatus.accepted:
        return Users.isAdministrator(user) ? { previous: AssessmentStatus.review } : {}

      // System's in the middle of changing the state
      case AssessmentStatus.changing:
        return {}

      // in editing or default NationalCorrespondent and AlternateNationalCorrespondent can submit to review
      case AssessmentStatus.editing:
      default:
        return Users.isAdministrator(user) ||
          Users.isNationalCorrespondent(user, countryIso) ||
          Users.isAlternateNationalCorrespondent(user, countryIso)
          ? { next: AssessmentStatus.review }
          : {}
    }
  },
}
