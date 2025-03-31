import { AreaCode } from 'meta/area'
import { AssessmentName } from 'meta/assessment/assessment'
import { ColName } from 'meta/assessment/col'
import { CycleName } from 'meta/assessment/cycle'
import { NodeValue } from 'meta/assessment/node'
import { TableName } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'

export type RecordRowData = Record<VariableName, NodeValue>
export type RecordColumnData = Record<ColName, RecordRowData>
export type RecordTableData = Record<TableName, RecordColumnData>
export type RecordCountryData = { [key in AreaCode]?: RecordTableData }
export type RecordCycleData = Record<CycleName, RecordCountryData>
export type RecordAssessmentData = Record<AssessmentName, RecordCycleData>
