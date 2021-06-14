import { Express, Response, Request } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import { Requests } from '@server/utils'
import { addVersion, getAllVersions } from '@server/repository/versioning/versioningRepository'
import { ApiEndPoint } from '@common/api/endpoint'

export const VersioningCreate = {
  init: (express: Express): void => {
    express.post(
      ApiEndPoint.Versioning.create(),
      ApiAuthMiddleware.requireAdminPermission,
      async (req: Request, res: Response) => {
        const userId = Requests.getUserId(req)
        const { versionNumber, publishedAt } = req.body
        try {
          if (!versionNumber || !publishedAt || !userId) {
            Requests.sendErr(res)
          }
          addVersion(userId, versionNumber, publishedAt)
          const versions = await getAllVersions()
          res.json(versions)
        } catch (err) {
          Requests.sendErr(res, err)
        }
      }
    )
  },
}
