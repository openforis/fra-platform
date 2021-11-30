import { Assessment, AssessmentType } from '@core/assessment'
import { CountryIso } from './countryIso'
import { RegionCode } from '../meta/regionCode'

export type CountryAssessment = {
  [key in AssessmentType]: Assessment
}

export interface Country {
  countryIso: CountryIso
  regionCodes: Array<RegionCode>
  assessment: CountryAssessment
}
