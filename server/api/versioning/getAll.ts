import { Express, Response, Request } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import { getAllVersions } from '@server/repository/versioning/versioningRepository'
import { EndPoint } from '@server/api/endpoint'

export const VersioningGetAll = {
  init: (express: Express): void => {
    express.get(
      EndPoint.Versioning.getAll,
      ApiAuthMiddleware.requireAdminPermission,
      async (req: Request, res: Response) => {
        const versions = await getAllVersions()
        res.json(versions)
      }
    )
  },
}
