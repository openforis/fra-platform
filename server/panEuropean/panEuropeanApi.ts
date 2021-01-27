const db = require('../db/db')
const R = require('ramda')

const {persistPanEuropeanQuantitativeQuestionnaire, getPanEuropeanQuantitativeQuestionnaire, deletePanEuropeanQuantitativeQuestionnaire} = require('./panEuropeanRepository')
const {getCountry} = require('./../country/countryRepository')

const {sendErr} = require('../utils/requestUtils')

const {fileTypes, downloadFile} = require('../fileRepository/fileRepository')
const Country = require('../../common/country/country')

const Auth = require('../auth/authApiMiddleware')
const VersionService = require('../versioning/service')

module.exports.init = app => {

  const isPanEuropeanCountry = async (countryIso) => {
    const country = await getCountry(countryIso)
    return Country.isPanEuropean(country)
  }

  app.get('/panEuropean/:countryIso/uploadedQuestionareInfo', async (req, res) => {
    try {
      const schemaName = await VersionService.getDatabaseSchema(req)
      const questionnaire = await getPanEuropeanQuantitativeQuestionnaire(req.params.countryIso, schemaName)
      const questionnaireFileName = R.path(['quantitativeQuestionnaireName'], questionnaire)
      res.json({questionnaireFileName})
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.delete('/panEuropean/:countryIso', Auth.requireCountryEditPermission, async (req, res) => {
    try {
      await db.transaction(deletePanEuropeanQuantitativeQuestionnaire, [req.params.countryIso])
      res.json({})
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.post('/panEuropean/:countryIso/upload', Auth.requireCountryEditPermission, async (req, res) => {
    try {
      const isPanEuropean = await isPanEuropeanCountry(req.params.countryIso)
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

  app.get('/panEuropean/:countryIso/downloadEmpty/:lang', Auth.requireCountryEditPermission, async (req, res) => {
    try {
      const isPanEuropean = await isPanEuropeanCountry(req.params.countryIso)

      isPanEuropean
        ? downloadFile(res, fileTypes.panEuropeanQuestionnaire, req.params.lang)
        : res.status(404).send('404 / Page not found')

    } catch (err) {
      sendErr(res, err)
    }
  })

  app.get('/panEuropean/:countryIso/download', async (req, res) => {
    try {
      const isPanEuropean = await isPanEuropeanCountry(req.params.countryIso)
      if (isPanEuropean) {
        const schemaName = await VersionService.getDatabaseSchema(req)
        const questionnaire = await getPanEuropeanQuantitativeQuestionnaire(req.params.countryIso, schemaName)
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
