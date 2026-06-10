import { DataSourceDescription } from 'meta/assessment/description'
import { UUID } from 'meta/uuid/uuid'

export type DataSourceLinked = {
  data: DataSource
  meta: DataSourceDescription
}

export type DataSourcesData = {
  dataSources: Array<DataSource>
  text?: string
}

export type DataSource = {
  comments: string
  placeholder?: boolean
  reference: string
  type: string
  uuid: UUID
  variables?: Array<string>
  year?: Array<string>
}

export type DataSourceHistoryCompare = {
  dataItem?: DataSource
  historyItem?: DataSource
}
