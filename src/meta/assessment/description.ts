import { CycleUuid } from './cycle'

export type DataSourceColumn = any

export interface AnalysisAndProcessingDescription {
  estimationAndForecasting: boolean
  reclassification: boolean
}

export interface NationalDataDescription {
  dataSources?: {
    table?: { columns: Array<DataSourceColumn> }
    text?: { readOnly?: boolean }
  }
  nationalClassification?: boolean
  originalData?: boolean
}

export interface Description {
  analysisAndProcessing?: AnalysisAndProcessingDescription
  nationalData?: NationalDataDescription

  comments?: boolean
  introductoryText?: boolean
}

export type Descriptions = Record<CycleUuid, Description>
