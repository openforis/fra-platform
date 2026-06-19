import { DataSourceDescription } from 'meta/assessment/description'
import {
  DataSource,
  DataSourceEditableField,
  DataSourceHistoryCompare,
  DataSourceLinked,
  DataSourcesData,
  DataSourceValidationErrors,
  DataSourceValidationErrorsRecord,
} from 'meta/assessment/descriptionValue/dataSource'

import { Option } from 'client/components/Inputs/Select'

export type DataSourceOnChange = (
  dataSource: DataSource,
  field: DataSourceEditableField,
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
  validationErrors?: DataSourceValidationErrorsRecord
}

export type PropsDataSourceComponent = Pick<PropsDataSources, 'columns' | 'meta' | 'onChange'> & {
  dataSource: DataSource
  disabled: boolean
  validationErrors?: DataSourceValidationErrors['reference']
}
