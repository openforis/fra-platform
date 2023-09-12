import { Country } from 'meta/area'

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
