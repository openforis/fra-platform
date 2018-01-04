const db = require('../db/db')
const R = require('ramda')

const {persistPanEuropeanQtyQuestionnaire, getPanEuropeanQtyQuestionnaire} = require('./panEuropeanRepository')

const {sendErr} = require('../utils/requestUtils')
const {checkCountryAccessFromReqParams} = require('../utils/accessControl')

module.exports.init = app => {

  app.post('/panEuropean/:countryIso/upload', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      await db.transaction(persistPanEuropeanQtyQuestionnaire, [req.user, req.params.countryIso, req.files.file])

      res.send({})
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.get('/panEuropean/:countryIso/download', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)
      const questionnaire = await getPanEuropeanQtyQuestionnaire(req.params.countryIso)

      if (R.isNil(questionnaire)) {
        // download empty default pan european questionnaire
        res.download(`${__dirname}/panEuropeanQuestionnaire.xls`, 'PanEuropeanQuestionnaire.xls')
      } else {
        res.setHeader('Content-Disposition', 'attachment; filename=' + questionnaire.qtyQuestionnaireName)
        res.end(questionnaire.qtyQuestionnaire, 'binary')
      }

    } catch (err) {
      sendErr(res, err)
    }
  })

}
