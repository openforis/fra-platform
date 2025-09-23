import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { TablePaginatedOrderByDirection } from 'meta/tablePaginated'
import { CountriesFilters } from 'meta/tablePaginated/countries'

export type CountrySummaryGetManyProps = {
  assessment: Assessment
  cycle: Cycle
  filters?: CountriesFilters
  limit?: number
  offset?: number
  orderBy?: string
  orderByDirection?: TablePaginatedOrderByDirection
}
