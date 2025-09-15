import { CountryIso } from 'meta/area'
import { RoleName, UserStatus } from 'meta/user'

export type UserFilters = {
  administrators?: boolean
  countries?: Array<CountryIso>
  disabled?: boolean
  fullName?: string
  invitations?: boolean
  roles?: Array<RoleName>
  statuses?: Array<UserStatus>
}
