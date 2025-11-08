import { CountryIso } from 'meta/area/countryIso'
import { LinkValidationStatusCode } from 'meta/cycleData'

export type LinksFilters = {
  approved?: boolean
  codes?: Array<LinkValidationStatusCode>
  countries?: Array<CountryIso>
  excludeDeleted?: boolean
}
