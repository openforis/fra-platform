import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Lang } from 'meta/lang'
import { TablePaginatedOrderByDirection } from 'meta/tablePaginated'
import { CountriesFilters } from 'meta/tablePaginated/countries'

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
