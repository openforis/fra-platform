import { Express, Response, Request } from 'express'
import { ApiEndPoint } from '@common/api/endpoint'

export const AuthLogout = {
  init: (express: Express): void => {
    express.post(ApiEndPoint.Auth.logout(), (req: Request, res: Response): void => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      req.logout(() => {})
      res.json({})
    })
  },
}
