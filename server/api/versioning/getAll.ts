import { Express, Response, Request } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import { getAllVersions } from '@server/repository/versioning/versioningRepository'
import { ApiEndPoint } from '@server/api/endpoint'

export const VersioningGetAll = {
  init: (express: Express): void => {
    express.get(
      ApiEndPoint.Versioning.getAll,
      ApiAuthMiddleware.requireAdminPermission,
      async (req: Request, res: Response) => {
        const versions = await getAllVersions()
        res.json(versions)
      }
    )
  },
}
