import { Express, Response, Request } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import * as db from '@server/db/db'
import { deleteFile } from '@server/repository/fileRepository/fileRepositoryRepository'
import { sendErr } from '@server/utils/requestUtils'
import { ApiEndPoint } from '@server/api/endpoint'

export const FileRepositoryDelete = {
  init: (express: Express): void => {
    // delete file
    express.delete(
      ApiEndPoint.FileRepository.delete,
      ApiAuthMiddleware.requireCountryEditPermission,
      async (req: Request, res: Response) => {
        try {
          const filesList = await db.transaction(deleteFile, [req.user, req.params.countryIso, req.params.fileId])

          res.json(filesList)
        } catch (err) {
          sendErr(res, err)
        }
      }
    )
  },
}
