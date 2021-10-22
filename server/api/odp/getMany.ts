import { Express, Response, Request } from 'express'
import { Requests } from '@server/utils'
import { ApiEndPoint } from '@common/api/endpoint'

export const OdpGetMany = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.Odp.getMany(), async (_: Request, res: Response) => {
      Requests.sendOk(res)
    })
  },
}
