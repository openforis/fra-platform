// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'db'.
const db = require('../db/db')

const {
  persistPanEuropeanQuantitativeQuestionnaire,
  getPanEuropeanQuantitativeQuestionnaire,
  deletePanEuropeanQuantitativeQuestionnaire,
} = require('./panEuropeanRepository')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getCountry... Remove this comment to see the full error message
const { getCountry } = require('../country/countryRepository')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'sendErr'.
const { sendErr } = require('../utils/requestUtils')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fileTypes'... Remove this comment to see the full error message
const { fileTypes, downloadFile } = require('../fileRepository/fileRepository')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Country'.
const Country = require('../../common/country/country')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Auth'.
const Auth = require('../auth/authApiMiddleware')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'VersionSer... Remove this comment to see the full error message
const VersionService = require('../versioning/service')

module.exports.init = (app: any) => {
  const isPanEuropeanCountry = async (countryIso: any) => {
    const country = await getCountry(countryIso)
    return Country.isPanEuropean(country)
  }

  app.get('/panEuropean/:countryIso/uploadedQuestionareInfo', async (req: any, res: any) => {
    try {
      const schemaName = await VersionService.getDatabaseSchema(req)
      const questionnaire = await getPanEuropeanQuantitativeQuestionnaire(req.params.countryIso, schemaName)
      const questionnaireFileName = R.path(['quantitativeQuestionnaireName'], questionnaire)
      res.json({ questionnaireFileName })
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.delete('/panEuropean/:countryIso', Auth.requireCountryEditPermission, async (req: any, res: any) => {
    try {
      await db.transaction(deletePanEuropeanQuantitativeQuestionnaire, [req.params.countryIso])
      res.json({})
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.post('/panEuropean/:countryIso/upload', Auth.requireCountryEditPermission, async (req: any, res: any) => {
    try {
      const isPanEuropean = await isPanEuropeanCountry(req.params.countryIso)
      if (isPanEuropean) {
        await db.transaction(persistPanEuropeanQuantitativeQuestionnaire, [
          req.user,
          req.params.countryIso,
          req.files.file,
        ])
        res.json({})
      } else {
        res.status(404).send('404 / Page not found')
      }
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.get(
    '/panEuropean/:countryIso/downloadEmpty/:lang',
    Auth.requireCountryEditPermission,
    async (req: any, res: any) => {
      try {
        const isPanEuropean = await isPanEuropeanCountry(req.params.countryIso)

        isPanEuropean
          ? downloadFile(res, fileTypes.panEuropeanQuestionnaire, req.params.lang)
          : res.status(404).send('404 / Page not found')
      } catch (err) {
        sendErr(res, err)
      }
    }
  )

  app.get('/panEuropean/:countryIso/download', async (req: any, res: any) => {
    try {
      const isPanEuropean = await isPanEuropeanCountry(req.params.countryIso)
      if (isPanEuropean) {
        const schemaName = await VersionService.getDatabaseSchema(req)
        const questionnaire = await getPanEuropeanQuantitativeQuestionnaire(req.params.countryIso, schemaName)
        res.setHeader('Content-Disposition', `attachment; filename=${questionnaire.quantitativeQuestionnaireName}`)
        res.end(questionnaire.quantitativeQuestionnaire, 'binary')
      } else {
        res.status(404).send('404 / Page not found')
      }
    } catch (err) {
      sendErr(res, err)
    }
  })
}
