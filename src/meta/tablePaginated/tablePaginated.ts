import { CountryIso } from 'meta/area'
import { RoleName } from 'meta/user'

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
  MULTI_SELECT = 'multi_select',
  SWITCH = 'switch',
  TEXT = 'text',
}

export type TablePaginatedFilterValues = boolean | string | Array<string>

export type UserFilters = {
  administrators?: boolean
  countries?: Array<CountryIso>
  fullName?: string
  roles?: Array<RoleName>
}
