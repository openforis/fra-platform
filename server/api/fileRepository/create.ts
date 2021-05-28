import { Express, Response, Request } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import * as db from '@server/db/db'
import { persistFile } from '@server/fileRepository/fileRepositoryRepository'
import * as Requests from '@server/utils/requestUtils'

export const FileRepositoryCreate = {
  init: (express: Express): void => {
    // upload new file
    express.post(
      '/api/fileRepository/:countryIso/upload',
      ApiAuthMiddleware.requireCountryEditPermission,
      async (req: Request, res: Response) => {
        try {
          const globalFile = req.body.global === 'true'

          const { countryIso } = req.params
          const fileCountryIso = globalFile ? null : countryIso

          const filesList = await db.transaction(persistFile, [req.user, countryIso, req.files.file, fileCountryIso])

          res.json(filesList)
        } catch (err) {
          Requests.sendErr(res, err)
        }
      }
    )
  },
}
