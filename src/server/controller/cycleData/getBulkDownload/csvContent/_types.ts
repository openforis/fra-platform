import { ColName } from 'meta/assessment/col'
import { TableName } from 'meta/assessment/table'

import {
  BulkDownloadColDescription,
  BulkDownloadForestArea,
  BulkDownloadTable,
  BulkDownloadVariable,
} from 'server/controller/cycleData/getBulkDownload/types'

export type CSVColValue = Pick<BulkDownloadTable, 'getDatum'> &
  BulkDownloadVariable & {
    colName: ColName
    tableName: TableName
  }

export type CSVRowOptions = {
  colDescriptions?: Array<BulkDownloadColDescription>
  colValues: Array<CSVColValue>
  colYear?: string
  forestArea?: BulkDownloadForestArea
  includeClimaticDomain?: boolean
  includeDeskStudy?: boolean
}
