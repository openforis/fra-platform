import { CountryIso } from 'meta/area'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { TableName } from 'meta/assessment/table'

export enum TableDataStatus {
  idle = 'idle',
  fetching = 'fetching',
  fetched = 'fetched',
  updating = 'updating',
  updated = 'updated',
}

export type TableDataStatusState = Record<
  AssessmentName,
  Record<CycleName, Record<CountryIso, Record<TableName, TableDataStatus>>>
>

export const initialState: TableDataStatusState = {}
