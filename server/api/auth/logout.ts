import { Express, Response, Request } from 'express'

export const AuthLogout = {
  init: (express: Express): void => {
    express.post('/auth/logout', (req: Request, res: Response): void => {
      req.logout()
      res.json({})
    })
  },
}
