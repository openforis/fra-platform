import { Express, Response, Request } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import { downloadFile, fileTypes } from '@server/service/fileRepository/fileRepository'
import { Requests } from '@server/utils'
import { ApiEndPoint } from '@common/api/endpoint'

export const FileRepositoryGetUserGuide = {
  init: (express: Express): void => {
    express.get(
      ApiEndPoint.FileRepository.getUserGuide(),
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
