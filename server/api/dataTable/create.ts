import { Express, Response, Request } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import * as db from '@server/db/db_deprecated'
import { Requests } from '@server/utils'
import { ApiEndPoint } from '@common/api/endpoint'
import { DataTableService } from '@server/service'

export const DataTableCreate = {
  init: (express: Express): void => {
    express.post(
      ApiEndPoint.DataTable.create(),
      ApiAuthMiddleware.requireCountryEditPermission,
      async (req: Request, res: Response) => {
        try {
          const {
            user,
            body,
            params: { countryIso, tableSpecName },
          } = req

          await db.transaction(DataTableService.create, [user, countryIso, tableSpecName, body])

          Requests.sendOk(res)
        } catch (err) {
          Requests.sendErr(res, err)
        }
      }
    )
  },
}
