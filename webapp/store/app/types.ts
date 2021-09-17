import { Country, CountryIso, Region, RegionGroup } from '@core/country'
import { AssessmentType } from '@core/assessment'
import { LanguageCodes } from '@core/lang'

export interface AppState {
  countries?: Country[]
  regions?: Region[]
  regionGroups?: RegionGroup[]
  loaded: boolean
  language?: typeof LanguageCodes[number]
  countryIso?: CountryIso
  assessmentType?: AssessmentType
  printView?: {
    onlyTables?: boolean
  }
}
