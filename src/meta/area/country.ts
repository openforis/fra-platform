import { CountryIso } from 'meta/area/countryIso'
import { CountrySummary } from 'meta/area/countrySummary'
import { RegionCode } from 'meta/area/regionCode'
import { AssessmentStatus } from 'meta/area/status'

export type CountryProps = {
  deskStudy: boolean
  domain: string // ex: tropical
  forestCharacteristics: { useOriginalDataPoint: boolean }
  hideContactsTable?: boolean
  status: AssessmentStatus
}

export type Country = {
  countryIso: CountryIso
  props?: CountryProps
  regionCodes?: Array<RegionCode>
} & Pick<CountrySummary, 'lastAccepted' | 'lastEdit' | 'lastForApproval' | 'lastInReview' | 'lastUpdate'>
