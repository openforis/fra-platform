import { CountryIso } from 'meta/area/countryIso'
import { TableName } from 'meta/assessment/table'
import { RecordAssessmentData } from 'meta/data'
import { DimensionName } from 'meta/measurement/dimension'
import { MeasureName } from 'meta/measurement/measure'

export type ObservationProps = {
  countryIso: CountryIso
  data: RecordAssessmentData
  dimensionName: DimensionName
  lastCol?: boolean
  lastRow?: boolean
  measureName: MeasureName
  tableName: TableName
}
