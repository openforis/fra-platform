import { CountryIso, CountryStatus } from 'meta/area'
import { Lang } from 'meta/lang'
import { TablePaginatedOrderByDirection } from 'meta/tablePaginated'

export interface CountrySummaryQueryParams {
  countries?: Array<CountryIso>
  lang?: Lang
  limit?: number
  offset?: number
  orderBy?: string
  orderByDirection?: TablePaginatedOrderByDirection
  statuses?: Array<CountryStatus>
}
