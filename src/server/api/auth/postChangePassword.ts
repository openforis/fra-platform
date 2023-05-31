import { Objects } from 'utils/objects'
import { Request, Response } from 'express'

import { passwordHash } from 'server/api/auth/utils/passwordUtils'
import { UserController } from 'server/controller/user'
import { Requests } from 'server/utils'
import { validPassword } from 'server/utils/validPassword'

export const postChangePassword = async (req: Request, res: Response) => {
  try {
    const { email, password, uuid } = req.body

    if (Objects.isEmpty(password?.trim())) return Requests.send400(res, 'login.noEmptyPassword')
    if (!validPassword(password)) return Requests.send400(res, 'login.passwordError')

    const { user, userResetPassword } = await UserController.findByResetPassword({ resetPasswordUuid: uuid })
    if (!userResetPassword) return Requests.send400(res, 'login.errorOccurred')

    if (user.email !== email) return Requests.send400(res, 'login.errorOccurred')

    const changed = await UserController.changePassword({
      email: user.email,
      password: await passwordHash(password),
      resetPasswordUuid: uuid,
    })

    if (changed) return Requests.sendOk(res, { message: 'login.passwordChanged' })

    return Requests.send400(res, 'login.noLongerValid')
  } catch (err) {
    return Requests.sendErr(res, err)
  }
}
