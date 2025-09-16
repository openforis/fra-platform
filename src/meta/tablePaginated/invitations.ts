import { CountryIso } from 'meta/area'
import { RoleName } from 'meta/user'

export type InvitationFilters = {
  accepted?: boolean
  countries?: Array<CountryIso>
  expired?: boolean
  roles?: Array<RoleName>
}
