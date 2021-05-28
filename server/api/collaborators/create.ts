import { Express, Response, Request } from 'express'
import { persistCollaboratorCountryAccess } from '@server/repository/collaborators/collaboratorsRepository'
import * as Requests from '@server/utils/requestUtils'
import { checkCountryAccessFromReqParams } from '@server/utils/accessControl'
import * as db from '@server/db/db'

export const CollaboratorCreate = {
  init: (express: Express): void => {
    express.post('/api/collaboratorCountryAccess/:countryIso', async (req: Request, res: Response) => {
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
