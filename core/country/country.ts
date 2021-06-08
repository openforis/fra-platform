import { Assessment, AssessmentType } from '@core/assessment'
import { CountryIso } from './countryIso'
import { RegionCode } from './regionCode'

export type CountryAssessment = {
  [key in AssessmentType]: Assessment
}

export interface Country {
  countryIso: CountryIso
  regionCodes: RegionCode[]
  assessment: CountryAssessment
}
