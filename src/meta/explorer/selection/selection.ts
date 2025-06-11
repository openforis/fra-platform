import { CountryIso } from 'meta/area'
import { SectionName } from 'meta/assessment/section'
import { DimensionName } from 'meta/measurement/dimension'
import { MeasureName } from 'meta/measurement/measure'
import { UnitName } from 'meta/measurement/unit'

export type ExplorerSelection = {
  countries: Array<CountryIso>
  dimensions: Record<SectionName, Array<DimensionName>>
  measures: Record<SectionName, Array<MeasureName>>
  units: Record<SectionName, Record<MeasureName, UnitName>>
}
