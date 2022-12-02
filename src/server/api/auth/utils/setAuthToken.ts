import { Dates } from '@utils/dates'
import { Response } from 'express'
import * as jwt from 'jsonwebtoken'

import { User } from '@meta/user'

export const setAuthToken = (res: Response, { roles: _roles, ...user }: User): void => {
  const token = jwt.sign({ ...user }, process.env.TOKEN_SECRET)
  res.cookie('fra-auth-token', token, { expires: Dates.addMonths(new Date(), 12) })
}
