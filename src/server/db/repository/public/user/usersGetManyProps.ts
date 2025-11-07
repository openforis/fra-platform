import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { TablePaginatedOrderByDirection } from 'meta/tablePaginated'
import { UserFilters } from 'meta/tablePaginated/users'

export type UsersGetManyProps = {
  assessment?: Assessment
  cycle?: Cycle
  countryIso?: CountryIso

  filters?: UserFilters

  limit?: number
  offset?: number

  orderBy?: string
  orderByDirection?: TablePaginatedOrderByDirection
}
