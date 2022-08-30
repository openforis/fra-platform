import { Objects } from '@core/utils'
import { Request, Response } from 'express'

import { passwordHash } from '@server/api/auth/utils/passwordUtils'
import { UserController } from '@server/controller/user'
import { Requests } from '@server/utils'
import { validPassword } from '@server/utils/validPassword'

export const postChangePassword = async (req: Request, res: Response) => {
  try {
    const { email, password, uuid } = req.body

    if (Objects.isEmpty(password?.trim())) return Requests.send400(res, 'login.noEmptyPassword')
    if (!validPassword(password)) return Requests.send400(res, 'login.passwordError')

    const user = await UserController.getOne({ email })
    const hash = await passwordHash(password)
    const changed = await UserController.changePassword({
      email: user.email,
      password: hash,
      resetPasswordUuid: uuid,
    })
    if (changed) return Requests.sendOk(res, { message: 'login.passwordChanged' })
    return Requests.send400(res, 'login.noLongerValid')
  } catch (err) {
    return Requests.sendErr(res, err)
  }
}
