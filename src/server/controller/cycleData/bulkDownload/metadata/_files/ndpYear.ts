import { ODPDataSourceMethod } from 'meta/assessment/originalDataPoint'

import { BulkDownloadFileFactory } from 'server/controller/cycleData/bulkDownload/metadata/_types'
import {
  BulkDownloadColNode,
  BulkDownloadColType,
  BulkDownloadDatumType,
  BulkDownloadRow,
} from 'server/controller/cycleData/bulkDownload/types'

const tableName = 'odp'
const datumType = BulkDownloadDatumType.string
const colType = BulkDownloadColType.odp

export const getNDPYear: BulkDownloadFileFactory = (props) => {
  const { i18n, includeClimaticDomain } = props

  const colNodes: Array<BulkDownloadColNode> = [
    {
      colName: 'minYear',
      colType,
      csvColumn: i18n.t('bulkDownload.NDPYear.earliestYear'),
      datumType,
      tableName,
      variableName: 'minYear',
    },
    {
      colName: 'maxYear',
      colType,
      csvColumn: i18n.t('bulkDownload.NDPYear.latestYear'),
      datumType,
      tableName,
      variableName: 'maxYear',
    },
    ...Object.values(ODPDataSourceMethod).map<BulkDownloadColNode>((colName) => {
      return {
        colName,
        colType,
        csvColumn:
          colName === ODPDataSourceMethod.other
            ? i18n.t('common.other')
            : i18n.t(`nationalDataPoint.dataSourceMethodsOptions.${colName}`),
        datumType,
        tableName,
        variableName: 'dataSourceTypes',
      }
    }),
  ]

  const row: BulkDownloadRow = { colNodes }

  return { includeClimaticDomain, includeDeskStudy: true, includeForestArea: true, fileName: 'NDPYear', rows: [row] }
}
