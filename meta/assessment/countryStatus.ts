import { CountryIso } from '@meta/area'

export enum AssessmentStatus {
  editing = 'editing',
  review = 'review',
  approval = 'approval',
  accepted = 'accepted',
  changing = 'changing',
}

export interface CountryStatus {
  countryIso: CountryIso
  status: AssessmentStatus
  deskStudy: boolean
}
