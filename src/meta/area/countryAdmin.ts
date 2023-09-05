import { AssessmentStatus } from 'meta/area/country'
import { CountryIso } from 'meta/area/countryIso'

export type CountryAdmin = {
  countryIso: CountryIso
  edited: string // timestamp string
  invitationsAcceptedCount: number
  invitationsSentCount: number
  status: AssessmentStatus
  usersCount: number
}
