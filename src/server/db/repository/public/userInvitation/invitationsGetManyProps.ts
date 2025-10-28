import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { TablePaginatedOrderByDirection } from 'meta/tablePaginated'
import { InvitationFilters } from 'meta/tablePaginated/invitations'

export type InvitationsGetManyProps = {
  assessment: Assessment
  cycle: Cycle
  filters?: InvitationFilters
  limit?: number
  offset?: number
  orderBy?: string
  orderByDirection?: TablePaginatedOrderByDirection
}
