import {
  BulkDownloadFile,
  BulkDownloadTable,
  BulkDownloadYear,
  PropsBulkDownload,
  PropsBulkDownloadFileBuilder,
} from 'server/controller/cycleData/getBulkDownload/types'

/**
 * @deprecated
 */
export type BulkDownloadYearFactory = (props: PropsBulkDownload) => BulkDownloadYear
/**
 * @deprecated
 */
export type BulkDownloadTableFactory = (props: PropsBulkDownload) => BulkDownloadTable

export type BulkDownloadFileFactory = (props: PropsBulkDownloadFileBuilder) => BulkDownloadFile
export type BulkDownloadFilesFactory = (props: PropsBulkDownloadFileBuilder) => Array<BulkDownloadFile>
