import { Express, Response, Request } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import { getFilesList } from '@server/fileRepository/fileRepositoryRepository'
import { sendErr } from '@server/utils/requestUtils'

export const FileRepositoryGetFileList = {
  init: (express: Express): void => {
    // get files list
    express.get(
      '/api/fileRepository/:countryIso/filesList',
      ApiAuthMiddleware.requireCountryEditPermission,
      async (req: Request, res: Response) => {
        try {
          const filesList = await getFilesList(req.params.countryIso)

          res.json(filesList)
        } catch (err) {
          sendErr(res, err)
        }
      }
    )
  },
}
