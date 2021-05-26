import { Express, Response, Request } from 'express'
import * as JSZip from 'jszip'
import { ApiAuthMiddleware } from '@server/api/middleware'
import * as ExportService from '@server/assessment/service/exportService'
import * as Requests from '@server/utils/requestUtils'

export const AssessmentExport = {
  init: (express: Express): void => {
    express.get(
      '/api/assessment/admin/export',
      ApiAuthMiddleware.requireAdminPermission,
      async (req: Request, res: Response) => {
        try {
          const files = await ExportService.exportData()
          const zip = new JSZip()
          Object.values(files).forEach((file) => zip.file((file as any).fileName, (file as any).content))
          // zip.file('FraYears.csv', data)
          zip
            .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
            .pipe(res)
            .on('finish', function () {
              // JSZip generates a readable stream with a "end" event,
              // but is piped here in a writable stream which emits a "finish" event.
              res.end()
            })
        } catch (err) {
          Requests.sendErr(res, err)
        }
      }
    )
  },
}
