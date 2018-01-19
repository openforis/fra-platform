const db = require('../db/db')
const R = require('ramda')

const {persistPanEuropeanQuantitativeQuestionnaire, getPanEuropeanQuantitativeQuestionnaire, deletePanEuropeanQuantitativeQuestionnaire} = require('./panEuropeanRepository')
const {getCountry} = require('./../country/countryRepository')

const {sendErr} = require('../utils/requestUtils')
const {checkCountryAccessFromReqParams} = require('../utils/accessControl')

module.exports.init = app => {

  const isPanEuropeanCountry = async (res, countryIso) => {
    const country = await getCountry(countryIso)
    return country.panEuropean
  }

  app.get('/panEuropean/:countryIso/uploadedQuestionareInfo', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)
      const questionnaire = await getPanEuropeanQuantitativeQuestionnaire(req.params.countryIso)
      const questionnaireFileName = R.path(['quantitativeQuestionnaireName'], questionnaire)
      res.json({questionnaireFileName})
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.delete('/panEuropean/:countryIso', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)
      await db.transaction(deletePanEuropeanQuantitativeQuestionnaire, [req.params.countryIso])
      res.json({})
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.post('/panEuropean/:countryIso/upload', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const isPanEuropean = await isPanEuropeanCountry(res, req.params.countryIso)
      if (isPanEuropean) {
        await db.transaction(persistPanEuropeanQuantitativeQuestionnaire, [req.user, req.params.countryIso, req.files.file])
        res.json({})
      } else {
        res.status(404).send('404 / Page not found')
      }
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.get('/panEuropean/:countryIso/downloadEmpty', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const isPanEuropean = await isPanEuropeanCountry(res, req.params.countryIso)
      if (isPanEuropean) {
        const questionnaire = await getPanEuropeanQuantitativeQuestionnaire(req.params.countryIso)
        res.download(`${__dirname}/panEuropeanQuestionnaire.xls`, 'PanEuropeanQuestionnaire.xls')
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
        const questionnaire = await getPanEuropeanQuantitativeQuestionnaire(req.params.countryIso)
        res.setHeader('Content-Disposition', 'attachment; filename=' + questionnaire.quantitativeQuestionnaireName)
        res.end(questionnaire.quantitativeQuestionnaire, 'binary')
      } else {
        res.status(404).send('404 / Page not found')
      }

    } catch (err) {
      sendErr(res, err)
    }
  })

}
