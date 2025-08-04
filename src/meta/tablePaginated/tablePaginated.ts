import { CountryIso } from 'meta/area'
import { RoleName, UserStatus } from 'meta/user'
import { UUID } from 'meta/uuid'

export enum TablePaginatedOrderByDirection {
  asc = 'asc',
  desc = 'desc',
}

export type TablePaginatedOrderBy = {
  direction?: TablePaginatedOrderByDirection
  property?: string
}

export type TablePaginatedCount = {
  total: number
}

export enum TablePaginatedFilterType {
  COUNTRY = 'country',
  MULTI_SELECT = 'multi_select',
  SWITCH = 'switch',
  TEXT = 'text',
}

export type TablePaginatedFilterValues = boolean | string | Array<string>

export type UserFilters = {
  administrators?: boolean
  countries?: Array<CountryIso>
  disabled?: boolean
  fullName?: string
  invitations?: boolean
  roles?: Array<RoleName>
  statuses?: Array<UserStatus>
  excludeUuids?: Array<UUID>
}
