import { Express, Response, Request } from 'express'
import * as VersionService from '@server/service/versioning/service'
import * as db from '@server/db/db'
import * as repository from '@server/repository/descriptions/descriptionsRepository'
import { Requests } from '@server/utils'
import { ApiEndPoint } from '@common/api/endpoint'

export const DescriptionGet = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.Descriptions.get(), async (req: Request, res: Response) => {
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
