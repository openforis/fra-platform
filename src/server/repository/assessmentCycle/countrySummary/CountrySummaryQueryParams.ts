import { CountryIso, CountryStatus } from 'meta/area'
import { TablePaginatedOrderByDirection } from 'meta/tablePaginated'

export interface CountrySummaryQueryParams {
  countries?: Array<CountryIso>
  limit?: number
  offset?: number
  orderBy?: string
  orderByDirection?: TablePaginatedOrderByDirection
  statuses?: Array<CountryStatus>
}
