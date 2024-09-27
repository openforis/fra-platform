import { Areas, AssessmentStatus, Country, CountryIso } from 'meta/area'

import { User, Users } from '../user'
import { Assessment } from './assessment'
import { AssessmentName } from './assessmentName'
import { Cycle, CycleStatus } from './cycle'

export interface AssessmentStatusTransition {
  next?: AssessmentStatus
  previous?: AssessmentStatus
}

export const AssessmentStatusTransitions = {
  getAllowedTransition: (props: {
    country: Country
    countryIso: CountryIso
    user: User
    cycle: Cycle
  }): AssessmentStatusTransition => {
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

/**
 * Retrieves the most recently published cycle from an assessment.
 *
 * @param {Assessment} assessment - Assessment
 * @returns {Cycle | undefined} The most recently published cycle, or undefined if no published cycles exist.
 */
const getLastPublishedCycle = (assessment: Assessment): Cycle | undefined => {
  const publishedCycles = assessment.cycles.filter((cycle) => cycle.props.status === CycleStatus.published)

  if (publishedCycles.length === 0) {
    return undefined
  }

  return publishedCycles.reduce((last, current) => {
    const lastDate = new Date(last.props.datePublished)
    const currentDate = new Date(current.props.datePublished)
    return lastDate > currentDate ? last : current
  })
}

/**
 * Retrieves the most recently created cycle from an assessment.
 * Note: cycle.props.status can be draft, even when dateCreated is present.
 *
 * @param {Assessment} assessment - Assessment
 * @returns {Cycle | undefined} The most recently created cycle, or undefined if no cycles exist.
 */
const getLastCreatedCycle = (assessment: Assessment): Cycle | undefined => {
  const createdCycles = assessment.cycles.filter((cycle) => cycle.props.dateCreated)

  if (createdCycles.length === 0) {
    return undefined
  }

  return createdCycles.reduce((last, current) => {
    const lastDate = new Date(last.props.dateCreated)
    const currentDate = new Date(current.props.dateCreated)
    return lastDate > currentDate ? last : current
  })
}

export const Assessments = {
  getShortLabel,
  getLastPublishedCycle,
  getLastCreatedCycle,
}
