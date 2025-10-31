import { Country } from 'meta/area/country'

export type CountrySummary = {
  status: CountryStatus

  /* invitation/user counts */
  invitationsAcceptedCount: number
  invitationsSentCount: number
  usersCount: number
} & Pick<
  Country,
  | 'countryIso'
  | 'lastInAccepted'
  | 'lastEdit'
  | 'lastInApproval'
  | 'lastInReview'
  | 'lastInPublished'
  | 'lastUpdate'
  | 'lastEditOdp'
>
