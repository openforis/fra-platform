import { Response, Request } from 'express'

export const postLogout = (_: Request, res: Response): void => {
  res.clearCookie('token')
  res.json({})
}
