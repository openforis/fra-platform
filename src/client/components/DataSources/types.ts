import { DataSourceDescription } from 'meta/assessment/description'
import {
  DataSource,
  DataSourceHistoryCompare,
  DataSourceLinked,
  DataSourcesData,
  DataSourceValidator,
} from 'meta/assessment/descriptionValue/dataSource'
import { SectionName } from 'meta/assessment/section'

import { Option } from 'client/components/Inputs/Select'

export type PropsDataSources = {
  columns?: {
    type?: {
      isMulti?: boolean
      options?: Array<Option>
    }
  }
  data: DataSourcesData
  dataSourcesLinked?: Array<DataSourceLinked>
  historyCompares?: Array<DataSourceHistoryCompare>
  meta?: DataSourceDescription
  options?: {
    canEdit?: boolean
    canReview?: boolean
    canToggleEdit?: boolean
    canToggleHistory?: boolean
    displayHistory?: boolean
    displayTitle?: boolean
    includeVariables?: boolean
    includeYears?: boolean
  }
  sectionName: SectionName
  validator?: DataSourceValidator
}

export type PropsDataSourceComponent = {
  columns: PropsDataSources['columns']
  dataSource: DataSource
  disabled: boolean
  meta: DataSourceDescription
  sectionName: SectionName
}
