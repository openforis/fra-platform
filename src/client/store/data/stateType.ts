import { CountryIso } from 'meta/area'
import {
  AssessmentName,
  CommentableDescriptionValue,
  CycleName,
  DataSourceLinked,
  NodeValuesEstimation,
  SectionName,
} from 'meta/assessment'
import { RecordAssessmentData } from 'meta/data'

export interface DataBaseState {
  descriptions: Record<SectionName, Record<string, CommentableDescriptionValue>>
  linkedDataSources: Record<SectionName, Array<DataSourceLinked>>
}

type ODPLastUpdatedTimestampState = Record<AssessmentName, Record<CycleName, Record<CountryIso, { time?: string }>>>

// TODO: this has to become the only DataState (move descriptions and linkedDataSources here)
interface TableDataState {
  nodeValuesEstimations?: Record<string, NodeValuesEstimation>
  odpLastUpdatedTimestamp: ODPLastUpdatedTimestampState
  tableData?: RecordAssessmentData
}

type BaseState = Record<AssessmentName, Record<CycleName, DataBaseState>>

export type DataState = TableDataState & BaseState
