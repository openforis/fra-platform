import { CountryIso } from '@core/meta/area/countryIso'

export interface CountryConfig {
  certifiedAreas: Record<string, number | string> // type: year: value
  climaticDomainPercents2015: {
    boreal: number
    tropical: number
    temperate: number
    subtropical: number
  }
  domain: string // ex: tropical
  /*
    "1980": {
      "area": 186665,
      "estimate": true
    },
    "1981": {
      "area": 186665,
      "estimate": true
    },
   */
  faoStat: Record<
    string,
    {
      area: number
      estimate: boolean
    }
  >
  fra2015ForestAreas: Record<string, number | string> // type: year: value
}

export interface Country {
  countryIso: CountryIso
  config?: CountryConfig
}
