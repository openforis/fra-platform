import { CountryIso } from 'meta/area/countryIso'
import { SectionName } from 'meta/assessment/section'
import { DimensionName } from 'meta/measurement/dimension'
import { MeasureName } from 'meta/measurement/measure'
import { UnitName } from 'meta/measurement/unit'

export enum Axis {
  x = 'x',
  y = 'y',
}

export enum AxisType {
  countries = 'countries',
  dimensions = 'dimensions',
  measures = 'measures',
}

export type AxisSelection = {
  x: [AxisType] | [AxisType, AxisType]
  y: [AxisType] | [AxisType, AxisType]
}

export type ExplorerSelection = {
  axis: Record<SectionName, AxisSelection>
  countries: Array<CountryIso>
  dimensions: Record<SectionName, Array<DimensionName>>
  measures: Record<SectionName, Array<MeasureName>>
  units: Record<SectionName, Record<MeasureName, UnitName>>
}
