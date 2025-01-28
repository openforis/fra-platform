import { CountryIso } from 'meta/area'
import {
  ActivityLog,
  AssessmentName,
  ColName,
  CycleName,
  DataSourceLinked,
  DescriptionCountryValues,
  NodeValuesEstimation,
  NodeValueValidation,
  SectionName,
  TableName,
  VariableName,
} from 'meta/assessment'
import { Contact, HistoryTarget } from 'meta/cycleData'
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

export type RecordContacts = Record<AssessmentName, Record<CycleName, Record<CountryIso, Array<Contact>>>>

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
  tableData?: RecordAssessmentData
}

export type HistoryState = {
  activities?: HistoryActivitiesState
  lastApproved?: HistoryLastApprovedState
}

// TODO: this has to become the only DataState (move descriptions and linkedDataSources here)
interface TableDataState {
  contacts: RecordContacts
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
