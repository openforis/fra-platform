import {
  BulkDownloadFile,
  BulkDownloadTable,
  BulkDownloadYear,
  PropsBulkDownload,
} from 'server/controller/cycleData/getBulkDownload/types'

export type BulkDownloadYearFactory = (props: PropsBulkDownload) => BulkDownloadYear
export type BulkDownloadTableFactory = (props: PropsBulkDownload) => BulkDownloadTable
export type BulkDownloadFileFactory = (props: PropsBulkDownload) => BulkDownloadFile
