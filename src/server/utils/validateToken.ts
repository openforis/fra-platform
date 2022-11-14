import * as bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'

import { User } from '@meta/user'

import { UserController } from '@server/controller/user'

export async function validateToken(req: Request, res: Response, next: NextFunction) {
  const { token } = req.cookies
  if (!token) return next()
  const decodedJwt = jwt.decode(token) as { user: User; validation: string }
  const { user, validation } = decodedJwt

  const tokenUser = await UserController.getOne({ id: user.id })
  let valid = tokenUser.email === user.email

  if (valid) {
    // valid = await bcrypt.hash(user.email, 10) }, process.env.TOKEN_SECRET)
    valid = await bcrypt.compare(user.email, validation)
  }

  if (!valid) {
    res.clearCookie('token')
    return res.redirect('/')
  }
  return next()
}
