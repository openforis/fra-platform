import { CountryIso } from 'meta/area/countryIso'
import { RoleName } from 'meta/user/role/name'
import { UserStatus } from 'meta/user/user'

export type UserFilters = {
  administrators?: boolean
  countries?: Array<CountryIso>
  disabled?: boolean
  fullName?: string
  invitations?: boolean
  roles?: Array<RoleName>
  statuses?: Array<UserStatus>
}
