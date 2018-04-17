const db = require('../db/db')

const {sendErr} = require('../utils/requestUtils')
const {checkCountryAccessFromReqParams} = require('../utils/accessControl')

const {persistFile} = require('./fileRepositoryRepository')

module.exports.init = app => {

  app.post('/fileRepository/:countryIso/upload', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const filesList = await db.transaction(persistFile, [req.user, req.params.countryIso, req.files.file])

      res.json(filesList)

    } catch (err) {
      sendErr(res, err)
    }
  })

}
