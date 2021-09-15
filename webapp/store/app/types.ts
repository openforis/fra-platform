import { i18n } from 'i18next'
import { CountryIso, RegionCode } from '@core/country'

export interface Fra2020 {
  status: string
  deskStudy: boolean
}

export interface Assessment {
  fra2020: Fra2020
}

export interface Country {
  countryIso: CountryIso
  assessment: Assessment
  regionCodes: string[]
}

export interface Region {
  regionCode: RegionCode
  name: string
  regionGroup: number
}

export interface RegionGroup {
  id: number
  name: string
  order: number
}

export interface AppState {
  countries?: Country[]
  regions?: Region[]
  regionGroups?: RegionGroup[]
  loaded: boolean
  i18n?: i18n
  countryIso?: CountryIso
  assessmentType?: string
  printView?: {
    onlyTables?: boolean
  }
}
