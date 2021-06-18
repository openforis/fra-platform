import * as R from 'ramda'

import { ApiAuthMiddleware } from '@server/api/middleware'
import { OdpService } from '@server/service'
import * as db from '../db/db'
import { sendErr, sendOk } from '../utils/requests'

import * as fraRepository from '../repository/eof/fraRepository'
import * as auditRepository from '../repository/audit/auditRepository'
import * as estimationEngine from './estimationEngine'
import * as fraValueService from './fraValueService'

import * as defaultYears from './defaultYears'

import * as VersionService from '../service/versioning/service'

const fraWriters: { [key: string]: any } = {
  extentOfForest: fraRepository.persistEofValues,
  forestCharacteristics: fraRepository.persistFocValues,
}
const odpReaders: { [key: string]: any } = {
  extentOfForest: OdpService.readEofOdps,
  forestCharacteristics: OdpService.readFocOdps,
}

export const init = (app: any) => {
  app.post('/nde/:section/:countryIso', ApiAuthMiddleware.requireCountryEditPermission, async (req: any, res: any) => {
    const { section, countryIso } = req.params
    try {
      await db.transaction(auditRepository.insertAudit, [req.user.id, 'saveFraValues', countryIso, req.params.section])

      const writer = fraWriters[section]
      const updates = R.map((c: any) => writer(countryIso, c.year, c), req.body)
      for (const update of updates) {
        await update
      }

      sendOk(res)
    } catch (err) {
      sendErr(res, err)
    }
  })

  // persists section fra values
  app.post(
    '/nde/:section/country/:countryIso/:year',
    ApiAuthMiddleware.requireCountryEditPermission,
    async (req: any, res: any) => {
      const { section } = req.params
      const { countryIso } = req.params
      try {
        await db.transaction(auditRepository.insertAudit, [req.user.id, 'saveFraValues', countryIso, section])

        const writer = fraWriters[section]
        await writer(countryIso, req.params.year, req.body)

        sendOk(res)
      } catch (err) {
        sendErr(res, err)
      }
    }
  )

  app.get('/nde/:section/:countryIso', async (req: any, res: any) => {
    try {
      const schemaName = await VersionService.getDatabaseSchema(req)
      const fra = await fraValueService.getFraValues(req.params.section, req.params.countryIso, schemaName)
      res.json(fra)
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.post(
    '/nde/:section/generateFraValues/:countryIso',
    ApiAuthMiddleware.requireCountryEditPermission,
    async (req: any, res: any) => {
      const { section } = req.params
      const { countryIso } = req.params

      try {
        await db.transaction(auditRepository.insertAudit, [req.user.id, 'generateFraValues', countryIso, section])

        const readOdp = odpReaders[section]
        const writer = fraWriters[section]
        const generateSpec = req.body

        await estimationEngine.estimateAndWrite(readOdp, writer, countryIso, defaultYears, generateSpec)

        const schemaName = await VersionService.getDatabaseSchema(req)
        const fra = await fraValueService.getFraValues(req.params.section, req.params.countryIso, schemaName)
        res.json(fra)
      } catch (err) {
        sendErr(res, err)
      }
    }
  )
}
