import { Objects } from '@core/utils'
import { Request, Response } from 'express'

import { UserController } from '@server/controller/user'
import { Requests } from '@server/utils'
import { validEmail } from '@server/utils/validEmail'

export const postResetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body

    if (Objects.isEmpty(email?.trim())) return Requests.send400(res, 'login.emptyEmail')
    if (!validEmail({ email })) return Requests.send400(res, 'login.invalidEmail')

    const user = await UserController.getOne({ email })
    if (!user) return Requests.send400(res, 'login.noMatchingEmail')

    const userResetPassword = await UserController.createResetPassword({ user })
    if (userResetPassword) return Requests.sendOk(res, { message: 'login.passwordResetSent' })
    return Requests.send400(res, 'login.noMatchingEmail')
  } catch (err) {
    return Requests.sendErr(res, err)
  }
}
