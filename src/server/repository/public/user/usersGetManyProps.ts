import { CountryIso } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { TablePaginatedOrderByDirection, UserFilters } from 'meta/tablePaginated'

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
