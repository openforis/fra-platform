const db = require('../db/db')
const R = require('ramda')

const {persistPanEuropeanQtyQuestionnaire, getPanEuropeanQtyQuestionnaire} = require('./panEuropeanRepository')
const {getCountry} = require('./../country/countryRepository')

const {sendErr} = require('../utils/requestUtils')
const {checkCountryAccessFromReqParams} = require('../utils/accessControl')

module.exports.init = app => {

  const isPanEuropeanCountry = async (res, countryIso) => {
    const country = await getCountry(countryIso)
    return country.panEuropean
  }

  app.post('/panEuropean/:countryIso/upload', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const isPanEuropean = await isPanEuropeanCountry(res, req.params.countryIso)
      if (isPanEuropean) {

        await db.transaction(persistPanEuropeanQtyQuestionnaire, [req.user, req.params.countryIso, req.files.file])

        res.send({})

      } else {
        res.status(404).send('404 / Page not found')
      }
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.get('/panEuropean/:countryIso/download', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const isPanEuropean = await isPanEuropeanCountry(res, req.params.countryIso)
      if (isPanEuropean) {

        const questionnaire = await getPanEuropeanQtyQuestionnaire(req.params.countryIso)

        if (R.isNil(questionnaire)) {
          // download empty default pan european questionnaire
          res.download(`${__dirname}/panEuropeanQuestionnaire.xls`, 'PanEuropeanQuestionnaire.xls')
        } else {
          res.setHeader('Content-Disposition', 'attachment; filename=' + questionnaire.qtyQuestionnaireName)
          res.end(questionnaire.qtyQuestionnaire, 'binary')
        }

      } else {
        res.status(404).send('404 / Page not found')
      }

    } catch (err) {
      sendErr(res, err)
    }
  })

}
