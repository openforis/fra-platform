import { CountryIso } from 'meta/area/countryIso'
import { LinkValidationStatusCode } from 'meta/cycleData/links/link'

export type LinksFilters = {
  approved?: boolean
  codes?: Array<LinkValidationStatusCode>
  countries?: Array<CountryIso>
  excludeDeleted?: boolean
}
