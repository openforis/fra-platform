import { Country } from '@core/country'

export interface DataExportSelection {
  countryISOs: Array<string>
  variable: string
  columns: Array<string>
}

export interface DataExportState {
  countries: Array<Country>
  selection: Record<string, DataExportSelection>
}
