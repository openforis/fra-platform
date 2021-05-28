import { Express, Response, Request } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import * as db from '@server/db/db'
import * as repository from '@server/repository/descriptions/descriptionsRepository'
import * as Requests from '@server/utils/requestUtils'
import * as auditRepository from '@server/repository/audit/auditRepository'

export const DescriptionCreate = {
  init: (express: Express): void => {
    express.post(
      '/api/country/descriptions/:countryIso/:section/:name',
      ApiAuthMiddleware.requireCountryEditPermission,
      async (req: Request, res: Response) => {
        const { countryIso, section, name } = req.params
        const { content } = req.body
        try {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          await db.transaction(auditRepository.insertAudit, [req.user.id, 'saveDescriptions', countryIso, section])
          await db.transaction(repository.persistDescriptions, [countryIso, section, name, content])

          Requests.sendOk(res)
        } catch (err) {
          Requests.sendErr(res, err)
        }
      }
    )
  },
}
