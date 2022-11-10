import { CountryIso } from './countryIso'
import { RegionCode } from './regionCode'

export enum AssessmentStatus {
  editing = 'editing',
  review = 'review',
  approval = 'approval',
  accepted = 'accepted',
  changing = 'changing',
}

export interface CountryProps {
  deskStudy: boolean
  domain: string // ex: tropical
  forestCharacteristics: { [cycleUuid: string]: { useOriginalDataPoint: boolean } }
  status: AssessmentStatus
}

export interface Country {
  countryIso: CountryIso
  lastEdit?: string
  props?: CountryProps
  regionCodes?: Array<RegionCode>
}
