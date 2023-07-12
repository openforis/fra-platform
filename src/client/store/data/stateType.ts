import { CountryIso } from 'meta/area'
import {
  AssessmentName,
  ColName,
  CommentableDescriptionValue,
  CycleName,
  DataSourceLinked,
  NodeValuesEstimation,
  NodeValueValidation,
  SectionName,
  TableName,
  VariableName,
} from 'meta/assessment'
import { RecordAssessmentData } from 'meta/data'

export interface DataBaseState {
  descriptions: Record<SectionName, Record<string, CommentableDescriptionValue>>
  linkedDataSources: Record<SectionName, Array<DataSourceLinked>>
}

// validation state types
export type RecordTableValidationsState = Record<TableName, Record<ColName, Record<VariableName, NodeValueValidation>>>
export type RecordCountryValidationsState = Record<CountryIso, RecordTableValidationsState>
export type RecordCycleValidationsState = Record<CycleName, RecordCountryValidationsState>
export type RecordAssessmentValidationsState = Record<AssessmentName, RecordCycleValidationsState>

// odpLastUpdatedTimestamp state type
type ODPLastUpdatedTimestampState = Record<AssessmentName, Record<CycleName, Record<CountryIso, { time?: string }>>>

// TODO: this has to become the only DataState (move descriptions and linkedDataSources here)
interface TableDataState {
  nodeValuesEstimations?: Record<string, NodeValuesEstimation>
  nodeValueValidations: RecordAssessmentValidationsState
  odpLastUpdatedTimestamp: ODPLastUpdatedTimestampState
  tableData?: RecordAssessmentData
}

type BaseState = Record<AssessmentName, Record<CycleName, DataBaseState>>

export type DataState = TableDataState & BaseState
