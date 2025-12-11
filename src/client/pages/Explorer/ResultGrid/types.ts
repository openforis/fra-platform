import { Country } from 'meta/area/country'
import { AxisType } from 'meta/explorer/selection'
import { DimensionName } from 'meta/measurement/dimension'
import { MeasureName } from 'meta/measurement/measure'

export type CellExportAlways = {
  dimensionName: DimensionName
  measureName: MeasureName
}

export type CountryEntry = Country & { label: string }

export type Combination = Array<CountryEntry | string>

export type CountryOptionField = {
  getValue: (country: CountryEntry) => string
  key: 'deskStudy' | 'iso2' | 'iso3' | 'm49'
  label: string
}

export type AxisValues = {
  [AxisType.countries]: Array<CountryEntry>
  [AxisType.dimensions]: Array<string>
  [AxisType.measures]: Array<string>
}

export type UniquePrimaryAxis = Array<string> | Array<CountryEntry>
