import { ColName } from 'meta/assessment/col'
import { TableName } from 'meta/assessment/table'

import {
  BulkDownloadColDescription,
  BulkDownloadColNode,
  BulkDownloadGetDatum,
  BulkDownloadVariable,
} from 'server/controller/cycleData/getBulkDownload/types'

export type CSVColValue = BulkDownloadVariable & {
  colName: ColName
  getDatum?: BulkDownloadGetDatum
  tableName: TableName
}

export type CSVRowOptions = {
  colDescriptions?: Array<BulkDownloadColDescription>
  colForestArea?: BulkDownloadColNode
  colValues: Array<CSVColValue>
  colYear?: string
  includeClimaticDomain?: boolean
  includeDeskStudy?: boolean
}
