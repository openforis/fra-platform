import { Express, Response, Request } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import { deleteVersion, getAllVersions } from '@server/repository/versioning/versioningRepository'
import * as Requests from '@server/utils/requestUtils'

export const VersioningDelete = {
  init: (express: Express): void => {
    express.delete(
      '/api/versioning/:id',
      ApiAuthMiddleware.requireAdminPermission,
      async (req: Request, res: Response) => {
        const { id } = req.params
        if (!id) {
          return
        }

        try {
          await deleteVersion(id)
        } catch (error) {
          Requests.sendErr(res, error)
        }

        const versions = await getAllVersions()
        res.json(versions)
      }
    )
  },
}
