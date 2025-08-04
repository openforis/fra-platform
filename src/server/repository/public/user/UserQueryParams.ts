import { RoleName, UserStatus } from 'meta/user'
import { UUID } from 'meta/uuid'

export interface UserQueryParams {
  fullName?: string
  excludeUuids?: Array<UUID>
  countries?: Array<string>
  countryIso?: string
  roles?: Array<RoleName>
  statuses?: Array<UserStatus>
  limit?: number
  offset?: number
}
