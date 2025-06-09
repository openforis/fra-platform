import { CountryIso } from 'meta/area'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { NodeValuesEstimation } from 'meta/assessment/nodeValuesEstimation'
import { TableName } from 'meta/assessment/table'
import { RecordAssessmentData } from 'meta/data'

// data state

export type TableDataStatusState = Record<
  AssessmentName,
  Record<CycleName, Record<CountryIso, Record<TableName, TableDataStatus>>>
>

// odpLastUpdatedTimestamp state type
type ODPLastUpdatedTimestampState = Record<AssessmentName, Record<CycleName, Record<CountryIso, { time?: string }>>>

// table data status
export enum TableDataStatus {
  idle = 'idle',
  fetching = 'fetching',
  fetched = 'fetched',
  updating = 'updating',
  updated = 'updated',
}

// TODO: this has to become the only DataState (move descriptions and linkedDataSources here)
interface TableDataState {
  nodeValuesEstimations?: Record<string, NodeValuesEstimation>
  odpLastUpdatedTimestamp: ODPLastUpdatedTimestampState
  tableData?: RecordAssessmentData
  tableDataStatus: TableDataStatusState
}

export type DataState = TableDataState
