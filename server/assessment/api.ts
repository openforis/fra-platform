import * as JSZip from 'jszip'
import * as db from '../db/db'
import * as repository from './assessmentRepository'
import { sendErr, sendOk, serverUrl } from '../utils/requestUtils'
import { sendAssessmentNotification } from './sendAssessmentNotification'
import * as Auth from '../auth/authApiMiddleware'
import * as ExportService from './service/exportService'

export const init = (app: any) => {
  app.post('/assessment/:countryIso', Auth.requireCountryEditPermission, async (req: any, res: any) => {
    try {
      const assessment = req.body
      const notifyUsers = req.query.notifyUsers === 'true'
      const isStatusChange = await db.transaction(repository.changeAssessment, [
        req.params.countryIso,
        req.user,
        assessment,
      ])
      if (isStatusChange && notifyUsers) {
        await sendAssessmentNotification(req.params.countryIso, assessment, req.user, serverUrl(req))
      }
      sendOk(res)
    } catch (err) {
      sendErr(res, err)
    }
  })
  app.get('/assessment/admin/export', Auth.requireAdminPermission, async (req: any, res: any) => {
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
      sendErr(res, err)
    }
  })
}
