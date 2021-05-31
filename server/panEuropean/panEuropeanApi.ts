import * as R from 'ramda'
import { ApiAuthMiddleware } from '@server/api/middleware'
import * as db from '../db/db'

import {
  persistPanEuropeanQuantitativeQuestionnaire,
  getPanEuropeanQuantitativeQuestionnaire,
  deletePanEuropeanQuantitativeQuestionnaire,
} from './panEuropeanRepository'
import { getCountry } from '../repository/country/countryRepository'

import { sendErr } from '../utils/requestUtils'

import { fileTypes, downloadFile } from '../fileRepository/fileRepository'
import * as Country from '../../common/country/country'

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

  app.delete('/panEuropean/:countryIso', ApiAuthMiddleware.requireCountryEditPermission, async (req: any, res: any) => {
    try {
      await db.transaction(deletePanEuropeanQuantitativeQuestionnaire, [req.params.countryIso])
      res.json({})
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.post(
    '/panEuropean/:countryIso/upload',
    ApiAuthMiddleware.requireCountryEditPermission,
    async (req: any, res: any) => {
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
    }
  )

  app.get(
    '/panEuropean/:countryIso/downloadEmpty/:lang',
    ApiAuthMiddleware.requireCountryEditPermission,
    async (req: any, res: any) => {
      try {
        const isPanEuropean = await isPanEuropeanCountry(req.params.countryIso)

        if (isPanEuropean) {
          downloadFile(res, fileTypes.panEuropeanQuestionnaire, req.params.lang)
        } else {
          res.status(404).send('404 / Page not found')
        }
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
