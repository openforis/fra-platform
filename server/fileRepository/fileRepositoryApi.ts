// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'db'.
const db = require('../db/db')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'sendErr'.
const { sendErr } = require('../utils/requestUtils')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Auth'.
const Auth = require('../auth/authApiMiddleware')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'persistFil... Remove this comment to see the full error message
const { persistFile, getFilesList, getFile, deleteFile } = require('./fileRepositoryRepository')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fileTypes'... Remove this comment to see the full error message
const { fileTypes, downloadFile } = require('./fileRepository')

module.exports.init = (app: any) => {
  // get user guide
  app.get('/fileRepository/userGuide/:lang', Auth.requireCountryEditPermission, async (req: any, res: any) => {
    try {
      downloadFile(res, fileTypes.userGuide, req.params.lang)
    } catch (err) {
      sendErr(res, err)
    }
  })

  // statistical factsheets
  app.get('/fileRepository/statisticalFactsheets/:countryIso/:lang', async (req: any, res: any) => {
    try {
      const { countryIso, lang } = req.params
      downloadFile(res, fileTypes.statisticalFactsheets(countryIso), lang)
    } catch (err) {
      sendErr(res, err)
    }
  })

  // upload new file
  app.post('/fileRepository/:countryIso/upload', Auth.requireCountryEditPermission, async (req: any, res: any) => {
    try {
      const globalFile = req.body.global === 'true'

      const { countryIso } = req.params
      const fileCountryIso = globalFile ? null : countryIso

      const filesList = await db.transaction(persistFile, [req.user, countryIso, req.files.file, fileCountryIso])

      res.json(filesList)
    } catch (err) {
      sendErr(res, err)
    }
  })

  // get files list
  app.get('/fileRepository/:countryIso/filesList', Auth.requireCountryEditPermission, async (req: any, res: any) => {
    try {
      const filesList = await getFilesList(req.params.countryIso)

      res.json(filesList)
    } catch (err) {
      sendErr(res, err)
    }
  })

  // get file
  app.get('/fileRepository/:countryIso/file/:fileId', async (req: any, res: any) => {
    try {
      const file = await getFile(req.params.fileId)

      if (file) {
        res.setHeader('Content-Disposition', `attachment; filename=${file.fileName}`)
        res.end(file.file, 'binary')
      } else {
        res.status(404).send('404 / Page not found')
      }
    } catch (err) {
      sendErr(res, err)
    }
  })

  // delete file
  app.delete(
    '/fileRepository/:countryIso/file/:fileId',
    Auth.requireCountryEditPermission,
    async (req: any, res: any) => {
      try {
        const filesList = await db.transaction(deleteFile, [req.user, req.params.countryIso, req.params.fileId])

        res.json(filesList)
      } catch (err) {
        sendErr(res, err)
      }
    }
  )
}
