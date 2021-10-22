import { Express, Response, Request } from 'express'
import { Requests } from '@server/utils'
import { ApiEndPoint } from '@common/api/endpoint'

export const OdpGet = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.Odp.get(), async (_: Request, res: Response) => {
      Requests.sendOk(res)
    })
  },
}
