import { Express, Response, Request } from 'express'
import { EndPoint } from '@server/api/endpoint'

export const AuthLogout = {
  init: (express: Express): void => {
    express.post(EndPoint.Auth.logout, (req: Request, res: Response): void => {
      req.logout()
      res.json({})
    })
  },
}
