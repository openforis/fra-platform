import { Express, Response, Request } from 'express'
import * as ExportService from '@server/service/assessment/exportService'
import JSZip from 'jszip'
import * as util from 'util'
import * as fs from 'fs'
import * as path from 'path'
import { ApiEndPoint } from '@common/api/endpoint'
import { Requests } from '@server/utils'

export const DataExportBulkDownload = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.DataExport.bulkDownload(), async (req: Request, res: Response) => {
      try {
        const files = await ExportService.exportData(false)
        const zip = new JSZip()
        // Include README.txt in the zipfile
        const readFile = util.promisify(fs.readFile)
        const readmeFileName = 'README.txt'
        const readmeContent = await readFile(
          path.resolve(__dirname, '..', '..', 'static', 'dataExport', `./${readmeFileName}`)
        )
        zip.file(readmeFileName, readmeContent)
        Object.values(files).forEach(({ fileName, content }) => zip.file(fileName, content))
        zip
          .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
          .pipe(res)
          .on('finish', function () {
            res.end()
          })
      } catch (err) {
        Requests.sendErr(res, err)
      }
    })
  },
}
