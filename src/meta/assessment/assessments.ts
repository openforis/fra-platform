import { Areas, Country, CountryIso } from 'meta/area'
import { AssessmentStatus } from 'meta/area/country'

import { User, Users } from '../user'
import { AssessmentName } from './assessmentName'
import { Cycle } from './cycle'

export interface AssessmentStatusTransition {
  next?: AssessmentStatus
  previous?: AssessmentStatus
}

export const AssessmentStatusTransitions = {
  getAllowedTransition: (props: { country: Country; countryIso: CountryIso; user: User; cycle: Cycle }): AssessmentStatusTransition => {
    const { country, countryIso, cycle, user } = props

    const status = Areas.getStatus(country)

    // collaborator cannot change the status of the assessment
    if (!user || Users.isCollaborator(user, countryIso, cycle)) return {}

    switch (status) {
      // in review, only reviewer can do transitions
      case AssessmentStatus.review:
        return Users.isAdministrator(user) || Users.isReviewer(user, countryIso, cycle)
          ? { previous: AssessmentStatus.editing, next: AssessmentStatus.approval }
          : {}

      // In approval or accepted, only admin can do transitions
      case AssessmentStatus.approval:
        return Users.isAdministrator(user) ? { previous: AssessmentStatus.review, next: AssessmentStatus.accepted } : {}

      case AssessmentStatus.accepted:
        return Users.isAdministrator(user) ? { previous: AssessmentStatus.review } : {}

      case AssessmentStatus.notStarted: // No data has been entered
      case AssessmentStatus.changing: // System's in the middle of changing the state
        return {}

      // in editing or default NationalCorrespondent and AlternateNationalCorrespondent can submit to review
      case AssessmentStatus.editing:
      default:
        return Users.isAdministrator(user) ||
          Users.isNationalCorrespondent(user, countryIso, cycle) ||
          Users.isAlternateNationalCorrespondent(user, countryIso, cycle)
          ? { next: AssessmentStatus.review }
          : {}
    }
  },
}

const getShortLabel = (assessmentName: AssessmentName) => `${assessmentName}.labels.short`

export const Assessments = {
  getShortLabel,
}
