import { AreaCode } from 'meta/area'
import { AssessmentName, ColName, CycleName, NodeValue, TableName, VariableName } from 'meta/assessment'

export type RecordRowData = Record<VariableName, NodeValue>
export type RecordColumnData = Record<ColName, RecordRowData>
export type RecordTableData = Record<TableName, RecordColumnData>
// TODO: Rename to RecordAreaData
export type RecordCountryData = { [key in AreaCode]?: RecordTableData }
export type RecordCycleData = Record<CycleName, RecordCountryData>
export type RecordAssessmentData = Record<AssessmentName, RecordCycleData>
