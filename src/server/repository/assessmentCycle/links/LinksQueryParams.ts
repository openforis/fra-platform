import { LinkValidationStatusCode } from 'meta/cycleData'
import { TablePaginatedOrderByDirection } from 'meta/tablePaginated'

export interface LinksQueryParams {
  approved?: boolean
  codes?: Array<LinkValidationStatusCode>
  excludeDeleted?: boolean
  limit?: number
  offset?: number
  orderBy?: string
  orderByDirection?: TablePaginatedOrderByDirection
}
