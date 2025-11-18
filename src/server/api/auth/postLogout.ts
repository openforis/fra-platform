import { Request, Response } from 'express'

import { AuthToken } from 'meta/auth/token'

export const postLogout = (_: Request, res: Response): void => {
  res.clearCookie(AuthToken.fraAuthToken)
  res.json({})
}
