import { Response, Request } from 'express'

export const postLogout = (_: Request, res: Response) => {
  res.clearCookie('token')
  res.json({})
}
