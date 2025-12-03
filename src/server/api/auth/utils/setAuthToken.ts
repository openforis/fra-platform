import { Response } from 'express'
import jwt from 'jsonwebtoken'

import { AuthToken } from 'meta/auth/token'
import { User } from 'meta/user/user'
import { Dates } from 'utils/dates'

export const setAuthToken = (res: Response, { roles: _roles, ...user }: User): void => {
  const token = jwt.sign({ ...user }, process.env.TOKEN_SECRET)
  res.cookie(AuthToken.fraAuthToken, token, { expires: Dates.addMonths(new Date(), 12) })
}
