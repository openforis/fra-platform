import { CountryIso } from './countryIso'
import { RegionCode } from './regionCode'

export interface Country {
  countryIso: CountryIso
  regionCodes: RegionCode[]
  assessment: any
}
