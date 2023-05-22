import { CountryIso } from '@meta/area'
import { AssessmentName, CycleName, NodeValue, TableName, VariableName } from '@meta/assessment'

export type ColumnName = string

export type RecordRowData = Record<VariableName, NodeValue>
export type RecordColumnData = Record<ColumnName, RecordRowData>
export type RecordTableData = Record<TableName, RecordColumnData>
export type RecordCountryData = { [key in CountryIso]?: RecordTableData }
export type RecordCycleData = Record<CycleName, RecordCountryData>
export type RecordAssessmentData = Record<AssessmentName, RecordCycleData>

// countryIso -> tableName -> variableName -> colName -> colName -> NodeValue
/**
 * @deprecated
 */
export type TableData = Record<CountryIso, Record<string, Record<string, Record<string, NodeValue>>>>
