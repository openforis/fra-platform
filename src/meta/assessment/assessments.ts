import { Country, CountryIso } from '@meta/area'
import { AssessmentStatus } from '@meta/area/country'
import { User, Users } from '../user'

export interface AssessmentStatusTransition {
  next?: AssessmentStatus
  previous?: AssessmentStatus
}

export const AssessmentStatusTransitions = {
  getAllowedTransition: (props: {
    country: Country
    countryIso: CountryIso
    user: User
  }): AssessmentStatusTransition => {
    const {
      country: {
        props: { status },
      },
      countryIso,
      user,
    } = props

    // collaborator cannot change the status of the assessment
    if (!user || Users.isCollaborator(user, countryIso)) return {}

    switch (status) {
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
