import { CountryIso } from 'meta/area/countryIso'
import { LinkValidationStatusCode } from 'meta/cycleData/links/link'
import { TablePaginatedOrderByDirection } from 'meta/tablePaginated'

export interface LinksQueryParams {
  approved?: boolean
  codes?: Array<LinkValidationStatusCode>
  countries?: Array<CountryIso>
  excludeDeleted?: boolean
  limit?: number
  offset?: number
  orderBy?: string
  orderByDirection?: TablePaginatedOrderByDirection
}
