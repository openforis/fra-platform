import { CountryIso } from 'meta/area'
import { RoleName } from 'meta/user'

export interface InvitationQueryParams {
  accepted?: boolean
  assessmentId: number
  countries?: Array<CountryIso>
  countryIso?: string
  cycleId: number
  expired?: boolean
  limit?: number
  offset?: number
  roles?: Array<RoleName>
}
