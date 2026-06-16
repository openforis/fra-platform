import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { TableNames } from 'meta/assessment/table'

import { BulkDownloadFileFactory } from 'server/controller/cycleData/bulkDownload/metadata/_types'
import {
  BulkDownloadColNode,
  BulkDownloadColType,
  BulkDownloadDatumType,
  BulkDownloadRow,
} from 'server/controller/cycleData/bulkDownload/types'

export const getDegradedForest: BulkDownloadFileFactory = (_props) => {
  const datumType = BulkDownloadDatumType.string
  const colNodes: Array<BulkDownloadColNode> = [
    {
      colName: 'hasNationalDefinitionOfDegradedForest',
      csvColumn: 'Has your country nat. definition of degradation',
      datumType,
      tableName: TableNames.degradedForest2025,
      variableName: 'hasNationalDefinitionOfDegradedForest',
    },
    {
      colName: 'national_definition',
      csvColumn: 'What is the national definition',
      datumType,
      tableName: TableNames.degradedForest2025,
      variableName: 'national_definition',
    },
    {
      colName: 'criteriaOfDegradedForest',
      csvColumn: 'Criteria applied',
      datumType: BulkDownloadDatumType.strings,
      tableName: TableNames.degradedForest2025,
      variableName: 'criteriaOfDegradedForest',
    },
    {
      colName: 'doesYourCountryMonitor',
      csvColumn: 'Does your country monitor degradation',
      datumType,
      tableName: TableNames.degradedForestMonitoring2025,
      variableName: 'doesYourCountryMonitor',
    },
    {
      colName: 'mainMethods',
      csvColumn: 'Main methods applied',
      datumType: BulkDownloadDatumType.strings,
      tableName: TableNames.degradedForestMonitoring2025,
      variableName: 'mainMethods',
    },
    {
      colName: 'monitoringScale',
      csvColumn: 'Monitoring scale',
      datumType,
      tableName: TableNames.degradedForestMonitoring2025,
      variableName: 'monitoringScale',
    },
    {
      colName: 'yearOfLatestAssessment',
      csvColumn: 'year of latest assessment',
      datumType,
      tableName: TableNames.degradedForestMonitoring2025,
      variableName: 'yearOfLatestAssessment',
    },
    {
      colName: 'degradedAreaForThatYear',
      csvColumn: 'Degraded forest area',
      tableName: TableNames.degradedForestMonitoring2025,
      variableName: 'degradedAreaForThatYear',
    },
    {
      colName: CommentableDescriptionName.generalComments,
      colType: BulkDownloadColType.description,
      csvColumn: 'comments',
      datumType,
      tableName: TableNames.degradedForest,
      variableName: CommentableDescriptionName.generalComments,
    },
  ]

  const row: BulkDownloadRow = { colNodes }

  return { fileName: 'DegradedForest', includeDeskStudy: true, rows: [row] }
}
