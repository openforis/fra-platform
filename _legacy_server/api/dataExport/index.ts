import { Express } from 'express'

import { DataExportGet } from '@server/api/dataExport/get'
import { DataExportBulkDownload } from './bulkDownload'

export const DataExportApi = {
  init: (express: Express): void => {
    DataExportBulkDownload.init(express)
    DataExportGet.init(express)
  },
}
