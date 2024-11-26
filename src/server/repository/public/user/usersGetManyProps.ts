import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { TablePaginatedOrderByDirection } from 'meta/tablePaginated'
import { RoleName, UserStatus } from 'meta/user'

export type UsersGetManyProps = {
  assessment?: Assessment
  cycle?: Cycle
  countryIso?: CountryIso

  administrators?: boolean
  countries?: Array<CountryIso>
  fullName?: string
  roles?: Array<RoleName>
  statuses?: Array<UserStatus>

  limit?: number
  offset?: number

  orderBy?: string
  orderByDirection?: TablePaginatedOrderByDirection
}
