import { LinkValidationStatusCode } from 'meta/cycleData'

export type LinksFilters = {
  approved?: boolean
  codes?: Array<LinkValidationStatusCode>
  excludeDeleted?: boolean
}
