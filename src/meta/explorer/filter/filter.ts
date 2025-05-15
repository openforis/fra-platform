import { CountryIso } from 'meta/area'
import { SectionName } from 'meta/assessment/section'
import { DimensionName } from 'meta/measurement/dimension'
import { MeasureName } from 'meta/measurement/measure'

export type ExplorerFilter = {
  countries: Array<CountryIso>
  dimensions: Record<SectionName, Array<DimensionName>>
  measures: Record<SectionName, Array<MeasureName>>
}
