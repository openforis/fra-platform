import { Express, Response, Request } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import { getFilesList } from '@server/repository/fileRepository/fileRepositoryRepository'
import { sendErr } from '@server/utils/requests'
import { ApiEndPoint } from '@common/api/endpoint'

export const FileRepositoryGetFileList = {
  init: (express: Express): void => {
    // get files list
    express.get(
      ApiEndPoint.FileRepository.getFileList(),
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
