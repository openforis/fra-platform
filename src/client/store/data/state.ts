import { CountryIso } from 'meta/area'
import { ActivityLog } from 'meta/assessment/activityLog'
import { AssessmentName } from 'meta/assessment/assessment'
import { ColName } from 'meta/assessment/col'
import { CycleName } from 'meta/assessment/cycle'
import { DataSourceLinked, DescriptionCountryValues } from 'meta/assessment/descriptionValue'
import { NodeValuesEstimation } from 'meta/assessment/nodeValuesEstimation'
import { NodeValueValidation } from 'meta/assessment/nodeValueValidation'
import { RecordAssessmentOriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { SectionName } from 'meta/assessment/section'
import { TableName } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'
import { HistoryTarget } from 'meta/cycleData/historyActivities'
import { RecordAssessmentData } from 'meta/data'

export interface DataBaseState {
  linkedDataSources: Record<SectionName, Array<DataSourceLinked>>
}

// data state
type DescriptionsState = Record<AssessmentName, Record<CycleName, DescriptionCountryValues>>
export type TableDataStatusState = Record<
  AssessmentName,
  Record<CycleName, Record<CountryIso, Record<TableName, TableDataStatus>>>
>

// validation state types
export type RecordTableValidationsState = Record<TableName, Record<ColName, Record<VariableName, NodeValueValidation>>>
export type RecordCountryValidationsState = Record<CountryIso, RecordTableValidationsState>
export type RecordCycleValidationsState = Record<CycleName, RecordCountryValidationsState>
export type RecordAssessmentValidationsState = Record<AssessmentName, RecordCycleValidationsState>

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

// ==============================
// History state types
// ==============================
export type HistoryActivitiesItemState = {
  labelKey: string
  target: HistoryTarget
}

export type HistoryActivitiesState = {
  items?: Record<HistoryTarget, HistoryActivitiesItemState>
  compareItem?: Record<HistoryTarget, ActivityLog<never>>
}

export type HistoryLastApprovedState = {
  active?: boolean
  descriptions?: DescriptionsState
  originalDataPoints?: RecordAssessmentOriginalDataPoint
  tableData?: RecordAssessmentData
}

export type HistoryState = {
  activities?: HistoryActivitiesState
  lastApproved?: HistoryLastApprovedState
}

// TODO: this has to become the only DataState (move descriptions and linkedDataSources here)
interface TableDataState {
  descriptions: DescriptionsState
  history: HistoryState
  nodeValueValidations: RecordAssessmentValidationsState
  nodeValuesEstimations?: Record<string, NodeValuesEstimation>
  odpLastUpdatedTimestamp: ODPLastUpdatedTimestampState
  tableData?: RecordAssessmentData
  tableDataStatus: TableDataStatusState
}

type BaseState = Record<AssessmentName, Record<CycleName, DataBaseState>>

export type DataState = TableDataState & BaseState
