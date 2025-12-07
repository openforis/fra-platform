import { BulkDownloadFile, PropsBulkDownloadFileBuilder } from 'server/controller/cycleData/getBulkDownload/types'

export type BulkDownloadFileFactory = (props: PropsBulkDownloadFileBuilder) => BulkDownloadFile
export type BulkDownloadFilesFactory = (props: PropsBulkDownloadFileBuilder) => Array<BulkDownloadFile>
