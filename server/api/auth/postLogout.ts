import { Response, Request } from 'express'

export const postLogout = (req: Request, res: Response): void => {
  req.logout()
  res.json({})
}
