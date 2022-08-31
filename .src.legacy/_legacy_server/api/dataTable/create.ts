import { Express, Response, Request } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import { Requests } from '@server/utils'
import { ApiEndPoint } from '@common/api/endpoint'
import { DataTableService } from '@server/controller'
import { User } from '@core/auth'
import { CountryIso } from '@core/country'

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

          await DataTableService.create({
            user: user as User,
            countryIso: countryIso as CountryIso,
            tableSpecName,
            tableData: body,
          })

          Requests.sendOk(res)
        } catch (err) {
          Requests.sendErr(res, err)
        }
      }
    )
  },
}
