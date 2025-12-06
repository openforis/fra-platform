import { BulkDownloadColDescription, BulkDownloadColNode } from 'server/controller/cycleData/getBulkDownload/types'

export type CSVRowOptions = {
  colDescriptions?: Array<BulkDownloadColDescription>
  colForestArea?: BulkDownloadColNode
  colNodes: Array<BulkDownloadColNode>
  colYear?: string
  includeClimaticDomain?: boolean
  includeDeskStudy?: boolean
}
