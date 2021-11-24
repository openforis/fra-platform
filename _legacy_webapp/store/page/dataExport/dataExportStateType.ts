import { Country } from '@core/country'

export interface DataExportSelection {
  countryISOs: Array<string>
  sections: Record<
    string,
    {
      columns: Array<string>
      variable: string
    }
  >
}

export interface DataExportState {
  countries: Array<Country>
  selection: DataExportSelection
}
