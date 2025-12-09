import { CountryIso, CountryIso2 } from 'meta/area/countryIso'
import { CountryStatus } from 'meta/area/countryStatus'
import { RegionCode } from 'meta/area/regionCode'
import { CycleName } from 'meta/assessment/cycle'
import { Lang } from 'meta/lang'

export type CallingCode = string

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
  callingCode: CallingCode
  countryIso: CountryIso
  countryIso2: CountryIso2
  m49: string
  props?: CountryProps
  regionCodes?: Array<RegionCode>
  sortIndex: Record<Lang, number>

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
