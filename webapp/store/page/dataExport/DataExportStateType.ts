import { Country } from '@core/country'

export interface DataExportSelection {
  columns: string[]
  countryISOs: string[]
  variable: string
}

export interface DataExportState {
  countries: Country[]
  selection: {
    [key: string]: DataExportSelection
  }
}
