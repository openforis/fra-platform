import { CycleUuid } from './cycle'

export type DataSourceColumn = any

export interface Description {
  analysisAndProcessing?: {
    estimationAndForecasting: boolean
    reclassification: boolean
  }
  comments?: boolean
  introductoryText?: boolean
  nationalData?: {
    dataSources?: {
      table?: { columns: Array<DataSourceColumn> }
      text?: { readOnly?: boolean }
    }
    nationalClassification?: boolean
  }
}

export type Descriptions = Record<CycleUuid, Description>
