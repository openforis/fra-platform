const db = require('../db/db')
const repository = require('./assessmentRepository')
const { sendErr, sendOk, serverUrl } = require('../utils/requestUtils')
const { checkAdminAccess } = require('../utils/accessControl')
const { sendAssessmentNotification } = require('./sendAssessmentNotification')

const Auth = require('../auth/authApiMiddleware')

const ExportService = require('./service/exportService')
const JSZip = require('jszip')

module.exports.init = app => {

  app.post('/assessment/:countryIso', Auth.requireCountryEditPermission, async (req, res) => {
    try {
      const assessment = req.body
      const notifyUsers = req.query.notifyUsers === 'true'

      const isStatusChange = await db.transaction(
        repository.changeAssessment,
        [
          req.params.countryIso,
          req.user,
          assessment
        ]
      )

      if (isStatusChange && notifyUsers) {
        await sendAssessmentNotification(req.params.countryIso, assessment, req.user, serverUrl(req))
      }

      sendOk(res)
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.get('/assessment/admin/export', Auth.requireAdminPermission, async (req, res) => {
    try {
      const user = req.user

      const files = await ExportService.exportData(user, ExportService.EXPORT_TYPE.CSV)

      const zip = new JSZip()

      Object.values(files).forEach(file =>

        zip.file(file.fileName, file.content)
      )

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
