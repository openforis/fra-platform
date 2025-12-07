import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { TableNames } from 'meta/assessment/table'

import { BulkDownloadFileFactory } from 'server/controller/cycleData/getBulkDownload/metadata/_types'
import {
  BulkDownloadColDescription,
  BulkDownloadColNode,
  BulkDownloadColNodeType,
  BulkDownloadRow,
} from 'server/controller/cycleData/getBulkDownload/types'

export const getDegradedForest: BulkDownloadFileFactory = (_props) => {
  const type = BulkDownloadColNodeType.string
  const colNodes: Array<BulkDownloadColNode> = [
    {
      colName: 'hasNationalDefinitionOfDegradedForest',
      csvColumn: 'Has your country nat. definition of degradation',
      tableName: TableNames.degradedForest2025,
      type,
      variableName: 'hasNationalDefinitionOfDegradedForest',
    },
    {
      colName: 'national_definition',
      csvColumn: 'What is the national definition',
      tableName: TableNames.degradedForest2025,
      type,
      variableName: 'national_definition',
    },
    {
      colName: 'criteriaOfDegradedForest',
      csvColumn: 'Criteria applied',
      tableName: TableNames.degradedForest2025,
      type: BulkDownloadColNodeType.strings,
      variableName: 'criteriaOfDegradedForest',
    },
    {
      colName: 'doesYourCountryMonitor',
      csvColumn: 'Does your country monitor degradation',
      tableName: TableNames.degradedForestMonitoring2025,
      type,
      variableName: 'doesYourCountryMonitor',
    },
    {
      colName: 'mainMethods',
      csvColumn: 'Main methods applied',
      tableName: TableNames.degradedForestMonitoring2025,
      type: BulkDownloadColNodeType.strings,
      variableName: 'mainMethods',
    },
    {
      colName: 'monitoringScale',
      csvColumn: 'Monitoring scale',
      tableName: TableNames.degradedForestMonitoring2025,
      type,
      variableName: 'monitoringScale',
    },
    {
      colName: 'yearOfLatestAssessment',
      csvColumn: 'year of latest assessment',
      tableName: TableNames.degradedForestMonitoring2025,
      type,
      variableName: 'yearOfLatestAssessment',
    },
    {
      colName: 'degradedAreaForThatYear',
      csvColumn: 'Degraded forest area',
      tableName: TableNames.degradedForestMonitoring2025,
      variableName: 'degradedAreaForThatYear',
    },
  ]

  const comments: BulkDownloadColDescription = {
    csvColumn: 'comments',
    name: CommentableDescriptionName.generalComments,
    sectionName: TableNames.degradedForest,
  }

  const row: BulkDownloadRow = { colDescriptions: [comments], colNodes }

  return { fileName: 'DegradedForest', rows: [row] }
}
