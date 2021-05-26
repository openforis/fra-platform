import { Express, Response, Request } from 'express'
import * as VersionService from '@server/versioning/service'
import * as db from '@server/db/db'
import * as repository from '@server/descriptions/descriptionsRepository'
import * as Requests from '@server/utils/requestUtils'

export const DescriptionGet = {
  init: (express: Express): void => {
    express.get('/api/country/descriptions/:countryIso/:section/:name', async (req: Request, res: Response) => {
      try {
        const schemaName = await VersionService.getDatabaseSchema(req)
        const result = await db.transaction(repository.readDescriptions, [
          req.params.countryIso,
          req.params.section,
          req.params.name,
          schemaName,
        ])

        res.json(result)
      } catch (err) {
        Requests.sendErr(res, err)
      }
    })
  },
}
