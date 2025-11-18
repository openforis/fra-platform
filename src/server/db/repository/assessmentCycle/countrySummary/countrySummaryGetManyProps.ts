import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Lang } from 'meta/lang'
import { CountriesFilters } from 'meta/tablePaginated/filters/countries'
import { TablePaginatedOrderByDirection } from 'meta/tablePaginated/orderBy'

export type CountrySummaryGetManyProps = {
  assessment: Assessment
  cycle: Cycle
  filters?: CountriesFilters
  lang?: Lang
  limit?: number
  offset?: number
  orderBy?: string
  orderByDirection?: TablePaginatedOrderByDirection
}
