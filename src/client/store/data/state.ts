import { CountryIso } from 'meta/area'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { TableName } from 'meta/assessment/table'

// data state

export type TableDataStatusState = Record<
  AssessmentName,
  Record<CycleName, Record<CountryIso, Record<TableName, TableDataStatus>>>
>

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
  tableDataStatus: TableDataStatusState
}

export type DataState = TableDataState
