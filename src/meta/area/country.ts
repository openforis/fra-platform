import { CountryIso } from './countryIso'
import { RegionCode } from './regionCode'

/**
 * TODO: rename to CountryStatus
 */
export enum AssessmentStatus {
  notStarted = 'notStarted',
  editing = 'editing',
  review = 'review',
  approval = 'approval',
  accepted = 'accepted',
  changing = 'changing',
}

export interface CountryProps {
  deskStudy: boolean
  domain: string // ex: tropical
  forestCharacteristics: { useOriginalDataPoint: boolean }
  status: AssessmentStatus
}

export interface Country {
  countryIso: CountryIso
  lastEdit?: string
  props?: CountryProps
  regionCodes?: Array<RegionCode>
}
