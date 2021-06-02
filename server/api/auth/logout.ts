import { Express, Response, Request } from 'express'
import { ApiEndPoint } from '@server/api/endpoint'

export const AuthLogout = {
  init: (express: Express): void => {
    express.post(ApiEndPoint.Auth.logout, (req: Request, res: Response): void => {
      req.logout()
      res.json({})
    })
  },
}
