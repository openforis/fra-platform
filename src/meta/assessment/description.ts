import { CycleUuid } from './cycle'

export type DataSourceColumn =
  | 'referenceToTataSource'
  | 'typeOfDataSource'
  | 'typeOfDataSourceText'
  | 'fraVariable'
  | 'variable'
  | 'yearForDataSource'
  | 'comments'

export interface AnalysisAndProcessingDescription {
  estimationAndForecasting: boolean
  reclassification: boolean
}

export interface DataSourceVariables {
  include: Array<string>
  exclude: Array<string>
}

export interface NationalDataDataSourceDescription {
  table?: { columns: Array<DataSourceColumn>; dataSourceVariables?: DataSourceVariables }
  text?: { readOnly?: boolean }
}

export interface NationalDataDescription {
  dataSources?: NationalDataDataSourceDescription
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
