import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { TablePaginatedOrderByDirection } from 'meta/tablePaginated'
import { LinksFilters } from 'meta/tablePaginated/links'

export type LinksGetManyProps = {
  assessment: Assessment
  cycle: Cycle
  filters?: LinksFilters
  limit?: number
  offset?: number
  orderBy?: string
  orderByDirection?: TablePaginatedOrderByDirection
}
