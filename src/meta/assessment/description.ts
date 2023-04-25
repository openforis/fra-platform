import { VariableName } from '@meta/assessment'
import { Label } from '@meta/assessment/label'

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
  // Custom i18n keys to include
  include: Array<string>
  prefixes?: Record<VariableName, Label>
}

export type DataSourceLinkedVariable = {
  assessmentName: string
  cycleName: string
  sectionName: string
  tableName: string
  variableName: string
}

export interface NationalDataDataSourceDescription {
  linkedVariables?: Array<DataSourceLinkedVariable>
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
