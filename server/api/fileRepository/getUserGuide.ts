import { Express, Response, Request } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import { downloadFile, fileTypes } from '@server/fileRepository/fileRepository'
import * as Requests from '@server/utils/requestUtils'

export const FileRepositoryGetUserGuide = {
  init: (express: Express): void => {
    express.get(
      '/api/fileRepository/userGuide/:lang',
      ApiAuthMiddleware.requireCountryEditPermission,
      async (req: Request, res: Response) => {
        try {
          downloadFile(res, fileTypes.userGuide, req.params.lang)
        } catch (err) {
          Requests.sendErr(res, err)
        }
      }
    )
  },
}
