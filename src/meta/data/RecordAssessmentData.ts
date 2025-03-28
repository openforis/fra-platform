import { AreaCode } from 'meta/area'
import { ColName, NodeValue, VariableName } from 'meta/assessment'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { TableName } from 'meta/assessment/table'

export type RecordRowData = Record<VariableName, NodeValue>
export type RecordColumnData = Record<ColName, RecordRowData>
export type RecordTableData = Record<TableName, RecordColumnData>
export type RecordCountryData = { [key in AreaCode]?: RecordTableData }
export type RecordCycleData = Record<CycleName, RecordCountryData>
export type RecordAssessmentData = Record<AssessmentName, RecordCycleData>
