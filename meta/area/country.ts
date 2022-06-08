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
  forestCharacteristics: { useOriginalDataPoint: boolean }
  status: AssessmentStatus
  // certifiedAreas: Record<string, number | string> // type: year: value
  // climaticDomainPercents2015: {
  //   boreal: number
  //   tropical: number
  //   temperate: number
  //   subtropical: number
  // }
  // faoStat: Record<
  //   string,
  //   {
  //     area: number
  //     estimate: boolean
  //   }
  // >
  // fra2015ForestAreas: Record<string, number | string> // type: year: value
}

export interface Country {
  countryIso: CountryIso
  lastEdit?: string
  props?: CountryProps
  regionCodes?: Array<RegionCode>
}
