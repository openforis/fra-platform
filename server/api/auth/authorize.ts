import { Express, Response, Request } from 'express'
import { ApiEndPoint } from '@common/api/endpoint'
import * as jwt from 'jsonwebtoken'
import { User } from '@core/auth'

export const AuthAuthorize = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.Auth.authorize(), (req: Request, res: Response) => {
      const { user } = (jwt.decode(req.cookies?.token) as Record<string, User>) ?? {}
      res.send({
        user,
      })
    })
  },
}
