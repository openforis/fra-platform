import { BulkDownloadTable, PropsBulkDownload } from 'server/controller/cycleData/getBulkDownload/types'

export type BulkDownloadTableFactory = (props: PropsBulkDownload) => BulkDownloadTable
