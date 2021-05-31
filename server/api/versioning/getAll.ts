import { Express, Response, Request } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import { getAllVersions } from '@server/repository/versioning/versioningRepository'

export const VersioningGetAll = {
  init: (express: Express): void => {
    express.get('/api/versioning/', ApiAuthMiddleware.requireAdminPermission, async (req: Request, res: Response) => {
      const versions = await getAllVersions()
      res.json(versions)
    })
  },
}
