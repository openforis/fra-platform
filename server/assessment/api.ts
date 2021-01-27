// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'JSZip'.
const JSZip = require('jszip')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'db'.
const db = require('../db/db')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'repository... Remove this comment to see the full error message
const repository = require('./assessmentRepository')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'sendErr'.
const { sendErr, sendOk, serverUrl } = require('../utils/requestUtils')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'sendAssess... Remove this comment to see the full error message
const { sendAssessmentNotification } = require('./sendAssessmentNotification')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Auth'.
const Auth = require('../auth/authApiMiddleware')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'ExportServ... Remove this comment to see the full error message
const ExportService = require('./service/exportService')

module.exports.init = (app: any) => {
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
      const files = await ExportService.exportData(ExportService.EXPORT_TYPE.CSV)
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
