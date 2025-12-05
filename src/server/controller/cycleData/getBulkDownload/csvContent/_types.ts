import { ColName } from 'meta/assessment/col'
import { TableName } from 'meta/assessment/table'

import {
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
  colValues: Array<CSVColValue>
  forestArea?: BulkDownloadForestArea
  includeClimaticDomain?: boolean
  includeDeskStudy?: boolean
  year?: string
}
