import { CountryIso } from 'meta/area/countryIso'
import { CountryStatus } from 'meta/area/status'

export type CountrySummary = {
  countryIso: CountryIso
  status: CountryStatus

  /* invitation/user counts */
  invitationsAcceptedCount: number
  invitationsSentCount: number
  usersCount: number

  /* last timestamp strings */
  lastInAccepted: string
  lastEdit: string
  lastEditOdpData: string
  lastInApproval: string
  lastInReview: string
  lastUpdate: string
}
