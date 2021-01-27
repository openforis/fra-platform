import * as R from 'ramda'
import * as db from '../db/db'

import {
  persistPanEuropeanQuantitativeQuestionnaire,
  getPanEuropeanQuantitativeQuestionnaire,
  deletePanEuropeanQuantitativeQuestionnaire,
} from './panEuropeanRepository'
import { getCountry } from '../country/countryRepository'

import { sendErr } from '../utils/requestUtils'

import { fileTypes, downloadFile } from '../fileRepository/fileRepository'
import * as Country from '../../common/country/country'

import * as Auth from '../auth/authApiMiddleware'
import * as VersionService from '../versioning/service'

export const init = (app: any) => {
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
