import { DataSourceDescription } from 'meta/assessment/description'
import {
  DataSourceHistoryCompare,
  DataSourceLinked,
  DataSourcesData,
} from 'meta/assessment/descriptionValue/dataSource'
import { SectionName } from 'meta/assessment/section'

export type PropsDataSources = {
  data: DataSourcesData
  dataSourcesLinked?: Array<DataSourceLinked>
  historyCompares?: Array<DataSourceHistoryCompare>
  meta?: DataSourceDescription
  options?: {
    canCopy?: boolean
    canToggleEdit?: boolean
    canToggleHistory?: boolean
    displayHistory?: boolean
  }
  sectionName: SectionName
}
