import { DataSourceDescription } from 'meta/assessment/description'
import { UUID } from 'meta/uuid/uuid'

// data
export type DataSource = {
  comments: string
  placeholder?: boolean
  reference: string
  type: string | Array<string>
  uuid: UUID
  variables?: Array<string>
  year?: Array<string>
}

export type DataSourcesData = {
  dataSources: Array<DataSource>
  text?: string
}

export type DataSourceLinked = {
  data: DataSource
  meta: DataSourceDescription
}

// history
export type DataSourceHistoryCompare = {
  dataItem?: DataSource
  historyItem?: DataSource
}

// validation
export type DataSourceValidation = Partial<Record<keyof DataSource, string>>
export type DataSourceValidator = (dataSource: DataSource) => DataSourceValidation
