import { DataSourceDescription } from 'meta/assessment/description'
import {
  DataSource,
  DataSourceHistoryCompare,
  DataSourceLinked,
  DataSourcesData,
  DataSourceValidator,
} from 'meta/assessment/descriptionValue/dataSource'

import { Option } from 'client/components/Inputs/Select'

export type DataSourceOnChange = (
  dataSource: DataSource,
  field: keyof DataSource,
  fieldValue: string | Array<string>
) => void

export type DataSourceOnDelete = (dataSource: DataSource) => void

export type PropsDataSources = {
  columns: {
    type: {
      isMulti?: boolean
      options: Array<Option>
    }
  }
  data: DataSourcesData
  dataSourcesLinked?: Array<DataSourceLinked>
  historyCompares?: Array<DataSourceHistoryCompare>
  meta?: DataSourceDescription
  onChange: DataSourceOnChange
  onDelete: DataSourceOnDelete
  options?: {
    canEdit?: boolean
    canReview?: boolean
    displayHistory?: boolean
    includeVariables?: boolean
    includeYears?: boolean
  }
  validator?: DataSourceValidator
}

export type PropsDataSourceComponent = Pick<PropsDataSources, 'columns' | 'meta' | 'onChange'> & {
  dataSource: DataSource
  disabled: boolean
}
