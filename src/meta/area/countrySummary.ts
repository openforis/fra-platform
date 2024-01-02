import { AssessmentStatus } from 'meta/area/country'
import { CountryIso } from 'meta/area/countryIso'

export type CountrySummary = {
  countryIso: CountryIso
  status: AssessmentStatus

  /* invitation/user counts */
  invitationsAcceptedCount: number
  invitationsSentCount: number
  usersCount: number

  /* last timestamp strings */
  lastAccepted: string
  lastEdit: string
  lastForApproval: string
  lastInReview: string
  lastUpdate: string
}
