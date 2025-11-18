import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { LinksFilters } from 'meta/tablePaginated/filters/links'
import { TablePaginatedOrderByDirection } from 'meta/tablePaginated/orderBy'

export type LinksGetManyProps = {
  assessment: Assessment
  cycle: Cycle
  filters?: LinksFilters
  limit?: number
  offset?: number
  orderBy?: string
  orderByDirection?: TablePaginatedOrderByDirection
}
