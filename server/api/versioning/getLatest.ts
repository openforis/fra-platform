import { Express, Response, Request } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import { getLatestSchemaVersion } from '@server/repository/versioning/versioningRepository'
import { ApiEndPoint } from '@common/api/endpoint'

export const VersioningGetLatest = {
  init: (express: Express): void => {
    express.get(
      ApiEndPoint.Versioning.getLatest(),
      ApiAuthMiddleware.requireAdminPermission,
      async (_req: Request, res: Response) => {
        const version = await getLatestSchemaVersion()
        res.json(version)
      }
    )
  },
}
