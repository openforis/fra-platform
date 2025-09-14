import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { InvitationFilters, TablePaginatedOrderByDirection } from 'meta/tablePaginated'

export type InvitationsGetManyProps = {
  assessment: Assessment
  cycle: Cycle
  filters?: InvitationFilters
  limit?: number
  offset?: number
  orderBy?: string
  orderByDirection?: TablePaginatedOrderByDirection
}
