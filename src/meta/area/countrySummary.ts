import { Country } from 'meta/area/country'
import { CountryIso } from 'meta/area/countryIso'
import { CountryStatus } from 'meta/area/status'

export type CountrySummary = {
  countryIso: CountryIso
  status: CountryStatus

  /* invitation/user counts */
  invitationsAcceptedCount: number
  invitationsSentCount: number
  usersCount: number
} & Pick<
  Country,
  'lastInAccepted' | 'lastEdit' | 'lastInApproval' | 'lastInReview' | 'lastInPublished' | 'lastUpdate' | 'lastEditOdp'
>
