import { Country, CountryIso, Region, RegionGroup } from '@core/country'
import { AssessmentType } from '@core/assessment'

export interface AppState {
  countries?: Country[]
  regions?: Region[]
  regionGroups?: RegionGroup[]
  loaded: boolean
  language: string
  countryIso?: CountryIso
  assessmentType?: AssessmentType
  printView?: {
    onlyTables?: boolean
  }
}
