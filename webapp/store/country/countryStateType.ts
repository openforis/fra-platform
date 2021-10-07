export interface AnnuallyUpdated {
  status: string
  deskStudy: boolean
  type: string
  canEditData: boolean
  canEditComments: boolean
}

export interface Fra2020 {
  type: string
  status: string
  deskStudy: boolean
  canEditData: boolean
  canEditComments: boolean
}

export interface Assessments {
  annuallyUpdated: AnnuallyUpdated
  fra2020: Fra2020
}

export interface CountryStatus {
  assessments: Assessments
}

export interface ClimaticDomainPercents2015 {
  tropical: number
  subtropical: number
  temperate: number
  boreal: number
}

export interface ClimaticDomainPercents {
  boreal: number
  temperate: number
  subtropical: number
  tropical: number
}

export interface CountryConfig {
  certifiedAreas: Record<string, string | number>
  climaticDomainPercents2015: ClimaticDomainPercents2015
  // faoStat of type:
  /*
   * <year>: { area, estimate }
   *
   */
  faoStat: Record<string | number, Record<string, number | string | boolean>>
  domain: string
  fra2015ForestAreas: Record<string, string | number>
  useOriginalDataPointsInFoc: boolean
  climaticDomainPercents: ClimaticDomainPercents
}

export interface CountryState {
  status?: CountryStatus
  config?: CountryConfig
}
