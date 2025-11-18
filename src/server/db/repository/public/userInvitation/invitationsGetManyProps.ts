import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { InvitationFilters } from 'meta/tablePaginated/filters/invitations'
import { TablePaginatedOrderByDirection } from 'meta/tablePaginated/orderBy'

export type InvitationsGetManyProps = {
  assessment: Assessment
  cycle: Cycle
  filters?: InvitationFilters
  limit?: number
  offset?: number
  orderBy?: string
  orderByDirection?: TablePaginatedOrderByDirection
}
