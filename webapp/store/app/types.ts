import { i18n } from 'i18next'
import { Country, CountryIso, Region, RegionGroup } from '@core/country'
import { AssessmentType } from '@core/assessment'

export interface AppState {
  countries?: Country[]
  regions?: Region[]
  regionGroups?: RegionGroup[]
  loaded: boolean
  i18n?: i18n
  countryIso?: CountryIso
  assessmentType?: AssessmentType
  printView?: {
    onlyTables?: boolean
  }
}
