import { Express, Response, Request } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import { downloadFile, fileTypes } from '@server/service/fileRepository/fileRepository'
import * as Requests from '@server/utils/requestUtils'
import { EndPoint } from '@server/api/endpoint'

export const FileRepositoryGetUserGuide = {
  init: (express: Express): void => {
    express.get(
      EndPoint.FileRepository.getUserGuide,
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
