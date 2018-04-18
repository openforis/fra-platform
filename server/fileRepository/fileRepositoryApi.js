const db = require('../db/db')

const {sendErr} = require('../utils/requestUtils')
const {checkCountryAccessFromReqParams} = require('../utils/accessControl')

const {persistFile, getFilesList, getFile, deleteFile} = require('./fileRepositoryRepository')

module.exports.init = app => {

  // upload new file
  app.post('/fileRepository/:countryIso/upload', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const filesList = await db.transaction(persistFile, [req.user, req.params.countryIso, req.files.file])

      res.json(filesList)

    } catch (err) {
      sendErr(res, err)
    }
  })

  // get files list
  app.get('/fileRepository/:countryIso/filesList', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const filesList = await getFilesList(req.params.countryIso)

      res.json(filesList)

    } catch (err) {
      sendErr(res, err)
    }
  })

  // get file
  app.get('/fileRepository/:countryIso/file/:fileId', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const file = await getFile(req.params.fileId)

      if (file) {
        res.setHeader('Content-Disposition', 'attachment; filename=' + file.fileName)
        res.end(file.file, 'binary')
      } else {
        res.status(404).send('404 / Page not found')
      }

    } catch (err) {
      sendErr(res, err)
    }
  })

  // delete file
  app.delete('/fileRepository/:countryIso/file/:fileId', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const filesList = await db.transaction(deleteFile, [req.user, req.params.countryIso, req.params.fileId])

      res.json(filesList)

    } catch (err) {
      sendErr(res, err)
    }
  })
}
