import { CountryIso } from 'meta/area/countryIso'
import { CountrySummary } from 'meta/area/countrySummary'
import { RegionCode } from 'meta/area/regionCode'
import { CountryStatus } from 'meta/area/status'

export type CountryProps = {
  deskStudy: boolean
  domain: string // ex: tropical
  forestCharacteristics: { useOriginalDataPoint: boolean }
  hideContactsTable?: boolean
  status: CountryStatus
}

export type Country = {
  countryIso: CountryIso
  props?: CountryProps
  regionCodes?: Array<RegionCode>
} & Pick<CountrySummary, 'lastInAccepted' | 'lastEdit' | 'lastInApproval' | 'lastInReview' | 'lastUpdate'>

export type RecordCountries = Record<CountryIso, Country>
