import { Express, Response, Request } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import * as Requests from '@server/utils/requestUtils'
import { addVersion, getAllVersions } from '@server/repository/versioning/versioningRepository'

export const VersioningCreate = {
  init: (express: Express): void => {
    express.post('/api/versioning/', ApiAuthMiddleware.requireAdminPermission, async (req: Request, res: Response) => {
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
    })
  },
}
