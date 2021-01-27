import * as db from '../db/db'
import { checkCountryAccessFromReqParams } from '../utils/accessControl'
import { persistCollaboratorCountryAccess } from './collaboratorsRepository'

import { sendErr } from '../utils/requestUtils'

export const init = (app: any) => {
  // save collaborator country access access
  app.post('/collaboratorCountryAccess/:countryIso', async (req: any, res: any) => {
    try {
      checkCountryAccessFromReqParams(req)

      const { countryIso } = req.params
      const collaboratorTableAccess = req.body

      await db.transaction(persistCollaboratorCountryAccess, [req.user, countryIso, collaboratorTableAccess])

      res.json({})
    } catch (err) {
      sendErr(res, err)
    }
  })
}
