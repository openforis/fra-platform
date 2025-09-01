import { CountryIso } from 'meta/area/countryIso'
import { RegionCode } from 'meta/area/regionCode'
import { CountryStatus } from 'meta/area/status'
import { CycleName } from 'meta/assessment/cycle'

type CallingCode = string
type CountryIso2 = string

export type CountryProps = {
  deskStudy: boolean
  domain: string // ex: tropical
  forestCharacteristics: { useOriginalDataPoint: boolean }
  hideContactsTable?: boolean
  status: CountryStatus
}

export type LastPublishedInfo = {
  cycleUuid: string
  cycleName: CycleName
  lastPublished: string
}

export type Country = {
  countryIso: CountryIso
  countryIso2?: CountryIso2
  callingCode: CallingCode
  props?: CountryProps
  regionCodes?: Array<RegionCode>

  /* last timestamp strings */
  lastEdit: string
  lastEditOdp: string
  lastInAccepted: string
  lastInApproval: string
  lastInPublished: string
  lastInReview: string
  lastUpdate: string

  lastPublishedInfo: LastPublishedInfo
}

export type RecordCountries = Record<CountryIso, Country>
