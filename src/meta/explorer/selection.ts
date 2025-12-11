import { CountryIso } from 'meta/area/countryIso'
import { SectionName } from 'meta/assessment/section'
import { DimensionName } from 'meta/measurement/dimension'
import { MeasureName } from 'meta/measurement/measure'
import { UnitName } from 'meta/measurement/unitName'

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

export type ExplorerCountryOptions = {
  showDeskStudy: boolean
  showIso2: boolean
  showIso3: boolean
  showM49: boolean
}

export type ExplorerSelection = {
  axis: Record<SectionName, AxisSelection>
  countries: Array<CountryIso>
  dimensions: Record<SectionName, Array<DimensionName>>
  measures: Record<SectionName, Array<MeasureName>>
  countryOptions: ExplorerCountryOptions
  units: Record<SectionName, Record<MeasureName, UnitName>>
}
