import { CountryIso } from '@meta/area'
import { AssessmentName, ColName, CycleName, NodeValue, TableName, VariableName } from '@meta/assessment'

export type RecordRowData = Record<VariableName, NodeValue>
export type RecordColumnData = Record<ColName, RecordRowData>
export type RecordTableData = Record<TableName, RecordColumnData>
export type RecordCountryData = { [key in CountryIso]?: RecordTableData }
export type RecordCycleData = Record<CycleName, RecordCountryData>
export type RecordAssessmentData = Record<AssessmentName, RecordCycleData>
