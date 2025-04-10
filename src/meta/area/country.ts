import { CountryIso } from 'meta/area/countryIso'
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
  lastPublishedCycleUuid: string
  lastPublishedCycleTimestamp: string

  /* last timestamp strings */
  lastEdit: string
  lastEditOdpData: string
  lastInAccepted: string
  lastInApproval: string
  lastInPublished: string
  lastInReview: string
  lastUpdate: string
}

export type RecordCountries = Record<CountryIso, Country>
