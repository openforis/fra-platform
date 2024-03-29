import { Express, Response, Request } from 'express'
import JSZip from 'jszip'
import { ApiAuthMiddleware } from '@server/api/middleware'
import * as ExportService from '@server/controller/assessment/_legacy/exportService'
import { Requests } from '@server/utils'
import { ApiEndPoint } from '@common/api/endpoint'

export const AssessmentExport = {
  init: (express: Express): void => {
    express.get(
      ApiEndPoint._Assessment.export(),
      ApiAuthMiddleware.requireAdminPermission,
      async (_req: Request, res: Response) => {
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
