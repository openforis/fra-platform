import { Request, Response } from 'express'

export const postLogout = (_: Request, res: Response): void => {
  res.clearCookie('fra-auth-token')
  res.json({})
}
