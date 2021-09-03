import { i18n } from 'i18next'

export interface Fra2020 {
  status: string
  deskStudy: boolean
}

export interface Assessment {
  fra2020: Fra2020
}

export interface Country {
  countryIso: string
  assessment: Assessment
  regionCodes: string[]
}

export interface Region {
  regionCode: string
  name: string
  regionGroup: number
}

export interface RegionGroup {
  id: number
  name: string
  order: number
}

export interface App {
  countries: Country[]
  regions: Region[]
  regionGroups: RegionGroup[]
  status: string
  i18n: i18n
  countryIso: string
  assessmentType: string
}

export interface ApplicationState {
  app: App
}
