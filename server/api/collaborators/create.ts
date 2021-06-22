import { Express, Response, Request } from 'express'
import { persistCollaboratorCountryAccess } from '@server/repository/collaborators/collaboratorsRepository'
import { Requests } from '@server/utils'
import { checkCountryAccessFromReqParams } from '@server/utils/accessControl'
import * as db from '@server/db/db_deprecated'
import { ApiEndPoint } from '@common/api/endpoint'

export const CollaboratorCreate = {
  init: (express: Express): void => {
    express.post(ApiEndPoint.Collaborators.create(), async (req: Request, res: Response) => {
      try {
        checkCountryAccessFromReqParams(req)

        const { countryIso } = req.params
        const collaboratorTableAccess = req.body

        await db.transaction(persistCollaboratorCountryAccess, [req.user, countryIso, collaboratorTableAccess])

        res.json({})
      } catch (err) {
        Requests.sendErr(res, err)
      }
    })
  },
}
