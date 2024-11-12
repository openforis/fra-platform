import { RoleName, UserStatus } from 'meta/user'

export interface UserQueryParams {
  fullName?: string
  countryIso?: string
  roles?: Array<RoleName>
  statuses?: Array<UserStatus>
  limit?: number
  offset?: number
}
