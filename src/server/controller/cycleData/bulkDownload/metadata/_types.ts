import { BulkDownloadFile, PropsBulkDownloadFileBuilder } from 'server/controller/cycleData/bulkDownload/types'

export type BulkDownloadFileFactory = (props: PropsBulkDownloadFileBuilder) => BulkDownloadFile
export type BulkDownloadFilesFactory = (props: PropsBulkDownloadFileBuilder) => Array<BulkDownloadFile>
