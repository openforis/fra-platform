import { Express, Response, Request } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import { deleteVersion, getAllVersions } from '@server/repository/versioning/versioningRepository'
import { Requests } from '@server/utils'
import { ApiEndPoint } from '@common/api/endpoint'

export const VersioningDelete = {
  init: (express: Express): void => {
    express.delete(
      ApiEndPoint.Versioning.delete(),
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
