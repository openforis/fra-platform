import { RoleName } from 'meta/user/role/name'
import { UserStatus } from 'meta/user/user'

export interface UserQueryParams {
  fullName?: string
  countries?: Array<string>
  countryIso?: string
  roles?: Array<RoleName>
  statuses?: Array<UserStatus>
  limit?: number
  offset?: number
}
