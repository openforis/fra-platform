import { CountryIso } from 'meta/area'
import {
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
import { RecordAssessmentData } from 'meta/data'
import { Contact } from 'meta/user'

export interface DataBaseState {
  linkedDataSources: Record<SectionName, Array<DataSourceLinked>>
}

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

export type RecordTableDataStatus = Record<
  AssessmentName,
  Record<CycleName, Record<CountryIso, Record<TableName, TableDataStatus>>>
>

export type RecordContacts = Record<AssessmentName, Record<CycleName, Record<CountryIso, Array<Contact>>>>

// TODO: this has to become the only DataState (move descriptions and linkedDataSources here)
interface TableDataState {
  contacts: RecordContacts
  descriptions: Record<AssessmentName, Record<CycleName, DescriptionCountryValues>>
  nodeValueValidations: RecordAssessmentValidationsState
  nodeValuesEstimations?: Record<string, NodeValuesEstimation>
  odpLastUpdatedTimestamp: ODPLastUpdatedTimestampState
  tableData?: RecordAssessmentData
  tableDataStatus: RecordTableDataStatus
}

type BaseState = Record<AssessmentName, Record<CycleName, DataBaseState>>

export type DataState = TableDataState & BaseState
