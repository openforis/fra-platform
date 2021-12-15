import { Country } from '@core/country'

export interface DataExportSelection {
  countryISOs: Array<string>
  sections: Record<
    string,
    {
      columns: Array<string>
      variables: Array<string>
    }
  >
}

export interface DataExportState {
  countries: Array<Country>
  selection: DataExportSelection
}
