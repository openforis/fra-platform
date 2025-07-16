import { Country } from 'meta/area'
import { AxisType } from 'meta/explorer/selection'
import { DimensionName } from 'meta/measurement/dimension'
import { MeasureName } from 'meta/measurement/measure'

export type CellExportAlways = {
  dimensionName: DimensionName
  measureName: MeasureName
}

export type CountryEntry = Country & { label: string }

export type Combination = Array<CountryEntry | string>

export type AxisValues = {
  [AxisType.countries]: Array<CountryEntry>
  [AxisType.dimensions]: Array<string>
  [AxisType.measures]: Array<string>
}

export type UniquePrimaryAxis = Array<string> | Array<CountryEntry>
