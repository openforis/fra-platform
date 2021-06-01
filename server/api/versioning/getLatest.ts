import { Express, Response, Request } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import { getLatestSchemaVersion } from '@server/repository/versioning/versioningRepository'
import { EndPoint } from '@server/api/endpoint'

export const VersioningGetLatest = {
  init: (express: Express): void => {
    express.get(
      EndPoint.Versioning.getLatest,
      ApiAuthMiddleware.requireAdminPermission,
      async (req: Request, res: Response) => {
        const version = await getLatestSchemaVersion()
        res.json(version)
      }
    )
  },
}
